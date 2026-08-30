CREATE OR REPLACE FUNCTION get_all_orders()
RETURNS TABLE (order_id INT, user_id INT, email VARCHAR, order_date DATE, total_items BIGINT, total_price NUMERIC)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        orders.id AS order_id,
        orders.user_id,
        users.email,
        orders.order_date,
        COALESCE(SUM(order_details.quantity), 0) AS total_items,
        COALESCE(SUM(order_details.price * order_details.quantity), 0) AS total_price
    FROM orders
    INNER JOIN users
        ON orders.user_id = users.id
    LEFT JOIN order_details
        ON orders.id = order_details.order_id
    GROUP BY
        orders.id,
        orders.user_id,
        users.email,
        orders.order_date
    ORDER BY orders.id;
END;
$$;

CREATE OR REPLACE FUNCTION get_order_by_id(
    p_order_id INT
)
RETURNS TABLE (
   order_id INT,
   user_id INT,
   email VARCHAR,
   order_date DATE,
   order_detail_id INT,
   book_id INT,
   title VARCHAR,
   quantity INT,
   price NUMERIC,
   total_price NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
        SELECT
            orders.id AS order_id,
            orders.user_id,
            users.email,
            orders.order_date,
            order_details.id AS order_detail_id,
            books.id AS book_id,
            books.title,
            order_details.quantity,
            order_details.price,
            (order_details.price * order_details.quantity)::NUMERIC AS total_price
        FROM orders
        INNER JOIN users
            ON orders.user_id = users.id
        INNER JOIN order_details
            ON orders.id = order_details.order_id
        INNER JOIN books
            ON order_details.book_id = books.id
        WHERE orders.id = p_order_id
        ORDER BY order_details.id;
END;
$$;

CREATE OR REPLACE FUNCTION get_orders_by_user_id(
    p_user_id INT
)
RETURNS TABLE (
    order_id INT,
    user_id INT,
    email VARCHAR,
    order_date DATE,
    total_items BIGINT,
    total_price NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
   RETURN QUERY
      SELECT
         orders.id AS order_id,
         orders.user_id,
         users.email,
         orders.order_date,
         COALESCE(SUM(order_details.quantity), 0) AS total_items,
         COALESCE(SUM(order_details.price * order_details.quantity), 0) AS total_price
      FROM orders
      INNER JOIN users
         ON orders.user_id = users.id
      LEFT JOIN order_details
         ON orders.id = order_details.order_id
      WHERE orders.user_id = p_user_id
      GROUP BY
         orders.id,
         orders.user_id,
         users.email,
         orders.order_date
      ORDER BY orders.id ASC;
END;
$$;

CREATE OR REPLACE PROCEDURE process_order_checkout(
   p_user_id INT,
   p_items JSONB
)
LANGUAGE plpgsql
AS $$
DECLARE
   v_order_id INT;
   v_item RECORD;
   v_book RECORD;
BEGIN
   IF p_user_id IS NULL OR p_items IS NULL OR jsonb_array_length(p_items) = 0 THEN
      RAISE EXCEPTION 'User ID and non-empty items list are required.';
   END IF;

   IF NOT EXISTS(SELECT 1 FROM users WHERE id = p_user_id) THEN
      RAISE EXCEPTION 'User with ID % does not exist.', p_user_id;
   END IF;

   INSERT INTO orders (user_id, order_date)
   VALUES (p_user_id, CURRENT_DATE)
   RETURNING orders.id INTO v_order_id;

   FOR v_item IN
      SELECT
         (item->>'book_id')::INT AS book_id,
         (item->>'quantity')::INT AS quantity
      FROM jsonb_array_elements(p_items) AS item
   LOOP

      IF v_item.quantity IS NULL OR v_item.quantity <= 0 THEN
            RAISE EXCEPTION 'Invalid quantity % for book ID %.', v_item.quantity, v_item.book_id;
      END IF;

      SELECT
         books.title,
         books.price,
         books.stock_quantity
      INTO v_book
      FROM books
      WHERE books.id = v_item.book_id
      FOR UPDATE; -- ROW LOCKING

      IF NOT FOUND THEN
         RAISE EXCEPTION 'Book with ID % was not found.', v_item.book_id;
      END IF;

      IF v_book.stock_quantity < v_item.quantity THEN
         RAISE EXCEPTION 'Insufficient stock for "%". Requested: %, Available: %',
               v_book.title, v_item.quantity, v_book.stock_quantity;
      END IF;

      UPDATE books
      SET stock_quantity = stock_quantity - v_item.quantity
      WHERE id = v_item.book_id;

      INSERT INTO order_details (order_id, book_id, quantity, price)
      VALUES (v_order_id, v_item.book_id, v_item.quantity, v_book.price);
   END LOOP;
END;
$$;

CREATE OR REPLACE PROCEDURE process_order_cancel(
   p_user_id INT,
   p_order_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
   IF p_user_id IS NULL OR p_order_id IS NULL THEN
      RAISE EXCEPTION 'Required parameters must not be NULL';
   END IF;

   IF NOT EXISTS(SELECT 1 FROM users WHERE users.id = p_user_id) THEN
      RAISE EXCEPTION 'User with ID % does not exist.', p_user_id;
   END IF;

   IF NOT EXISTS(SELECT 1 FROM orders WHERE orders.id = p_order_id) THEN
      RAISE EXCEPTION 'Order with ID % does not exist.', p_order_id;
   END IF;

   -- TODO: pahamin!!!
   -- Lock book rows to prevent race conditions during stock restoration
   PERFORM 1 FROM books
   INNER JOIN order_details ON books.id = order_details.book_id
   WHERE order_details.order_id = p_order_id
   FOR UPDATE OF books;

   UPDATE books
   SET stock_quantity = books.stock_quantity + order_details.quantity
   FROM order_details
   WHERE books.id = order_details.book_id AND order_details.order_id = p_order_id;

   DELETE FROM order_details
   WHERE order_details.order_id = p_order_id;

   DELETE FROM orders
   WHERE orders.id = p_order_id;
END;
$$;