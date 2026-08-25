CREATE OR REPLACE FUNCTION get_all_books()
RETURNS TABLE (book_id INT, title VARCHAR, author VARCHAR, price DECIMAL(10, 2), stock_quantity INT, created_at TIMESTAMP, updated_at TIMESTAMP)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
      SELECT
         books.id,
         books.title,
         books.author,
         books.price,
         books.stock_quantity,
         books.created_at,
         books.updated_at
      FROM books
      ORDER BY books.id ASC;
END;
$$;

CREATE OR REPLACE FUNCTION get_book_by_id(p_id INT)
RETURNS TABLE (book_id INT, title VARCHAR, author VARCHAR, price DECIMAL(10, 2), stock_quantity INT, created_at TIMESTAMP, updated_at TIMESTAMP)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
      SELECT 
         books.id,
         books.title,
         books.author,
         books.price,
         books.stock_quantity,
         books.created_at,
         books.updated_at
      FROM books
      WHERE books.id = p_id
      LIMIT 1;
END;
$$;

CREATE OR REPLACE PROCEDURE create_book(
    p_title VARCHAR,
    p_author VARCHAR,
    p_price DECIMAL(10, 2),
    p_stock_quantity INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF p_title IS NULL OR p_author IS NULL OR p_price IS NULL OR p_stock_quantity IS NULL THEN
        RAISE EXCEPTION 'Required parameters must not be NULL';
    END IF;

    IF p_price < 0 THEN
        RAISE EXCEPTION 'Price must be a positive value';
    END IF;

    IF p_stock_quantity < 0 THEN
        RAISE EXCEPTION 'Stock quantity must be a positive value';
    END IF;

    INSERT INTO books (title, author, price, stock_quantity)
    VALUES (p_title, p_author, p_price, p_stock_quantity);
END;
$$;

CREATE OR REPLACE PROCEDURE delete_book(p_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    IF p_id IS NULL THEN
        RAISE EXCEPTION 'Required parameters must not be NULL';
    END IF;

    DELETE FROM books
    WHERE books.id = p_id;
EXCEPTION
  WHEN OTHERS THEN
    RAISE;
END;
$$;

CREATE OR REPLACE PROCEDURE update_book(
    p_id INT,
    p_title VARCHAR DEFAULT NULL,
    p_author VARCHAR DEFAULT NULL,
    p_price DECIMAL(10, 2) DEFAULT NULL,
    p_stock_quantity INT DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF p_price IS NOT NULL AND p_price < 0 THEN
        RAISE EXCEPTION 'Price must be a positive value';
    END IF;

    IF p_stock_quantity IS NOT NULL AND p_stock_quantity < 0 THEN
        RAISE EXCEPTION 'Stock quantity must be a positive value';
    END IF;

    UPDATE books
    SET
        title = COALESCE(p_title, title),
        author = COALESCE(p_author, author),
        price = COALESCE(p_price, price),
        stock_quantity = COALESCE(p_stock_quantity, stock_quantity)
    WHERE id = p_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Book with ID % not found', p_id;
    END IF;
END;
$$;