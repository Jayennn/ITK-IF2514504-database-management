DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM pg_roles WHERE pg_roles.rolname = 'bookstore_admin') THEN
        CREATE ROLE bookstore_admin;
    END IF;

    IF NOT EXISTS(SELECT 1 FROM pg_roles WHERE pg_roles.rolname = 'bookstore_user') THEN
        CREATE ROLE bookstore_user;
    END IF;
END;
$$;
