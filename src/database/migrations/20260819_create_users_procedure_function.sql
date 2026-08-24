CREATE OR REPLACE PROCEDURE register_user(
    p_email VARCHAR,
    p_password VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF p_email IS NULL OR p_password IS NULL THEN
        RAISE EXCEPTION 'Required parameters must not be NULL';
    END IF;

    INSERT INTO users (email, password, role)
    VALUES (p_email, p_password, 'customer');
END;
$$;

CREATE OR REPLACE FUNCTION get_user_with_password_by_email(
    p_email VARCHAR
)
RETURNS TABLE (id INT, email VARCHAR, password VARCHAR, role user_role, created_at TIMESTAMP, updated_at TIMESTAMP)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
        SELECT
            users.id,
            users.email,
            users.password,
            users.role,
            users.created_at,
            users.updated_at
        FROM users
        WHERE users.email = p_email
        LIMIT 1;
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