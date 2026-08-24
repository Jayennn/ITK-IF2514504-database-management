CREATE OR REPLACE FUNCTION get_all_orders()
RETURNS TABLE (order_id INT, user_id INT, email VARCHAR, order_date DATE, total_items BIGINT, total_price NUMERIC)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        orders.id,
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

-- CREATE OR REPLACE FUNCTION get_orders_by_user_id(
--     p_user_id INT
-- )
-- RETURNS TABLE (order_id INT, user_id INT, email VARCHAR, order_date DATE, total_items BIGINT, total_price NUMERIC)
-- LANGUAGE plpgsql
-- AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT
--         orders.id,
--         orders.user_id,
--         users.email,
--         orders.order_date,
--         COALESCE(SUM(order_details.quantity), 0) AS total_items,
--         COALESCE(SUM(order_details.price * order_details.quantity), 0) AS total_price
--     FROM orders
--     INNER JOIN users
--         ON orders.user_id = users.id
--     LEFT JOIN order_details
--         ON orders.id = order_details.order_id
--     WHERE orders.user_id = p_user_id
--     GROUP BY
--         orders.id,
--         orders.user_id,
--         users.email,
--         orders.order_date
--     ORDER BY orders.id DESC;
-- END;
-- $$;
