CREATE OR REPLACE PROCEDURE register_user(
    p_username VARCHAR,
    p_password VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF p_username IS NULL OR p_password IS NULL THEN
        RAISE EXCEPTION 'Required parameters must not be NULL';
    END IF;

    INSERT INTO users (username, password, role)
    VALUES (p_username, p_password, 'customer');
END;
$$;

-- CREATE OR REPLACE FUNCTION get_user_by_id(p_id INT)
-- RETURNS TABLE (book_id INT, title VARCHAR, author VARCHAR, price DECIMAL(10, 2), stock_quantity INT, created_at TIMESTAMP, update_at TIMESTAMP)
-- LANGUAGE plpgsql
-- AS $$
-- BEGIN
--     RETURN QUERY
--       SELECT 
--          books.id,
--          books.title,
--          books.author,
--          books.price,
--          books.stock_quantity,
--          books.created_at,
--          books.updated_at
--       FROM books
--       WHERE books.id = p_id
--       LIMIT 1;
-- END;
-- $$;