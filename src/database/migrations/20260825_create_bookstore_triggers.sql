CREATE OR REPLACE FUNCTION set_timestamps_on_new_data()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.created_at := NOW();
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trigger_set_timestamps_users
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION set_timestamps_on_new_data();

CREATE OR REPLACE TRIGGER trigger_set_timestamps_books
BEFORE INSERT ON books
FOR EACH ROW
EXECUTE FUNCTION set_timestamps_on_new_data();

CREATE OR REPLACE TRIGGER trigger_set_timestamps_orders
BEFORE INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION set_timestamps_on_new_data();

CREATE OR REPLACE TRIGGER trigger_set_timestamps_order_details
BEFORE INSERT ON order_details
FOR EACH ROW
EXECUTE FUNCTION set_timestamps_on_new_data();

--- separator

CREATE OR REPLACE FUNCTION set_updated_at_on_updated_data()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trigger_set_updated_at_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at_on_updated_data();

CREATE OR REPLACE TRIGGER trigger_set_updated_at_books
BEFORE UPDATE ON books
FOR EACH ROW
EXECUTE FUNCTION set_updated_at_on_updated_data();

CREATE OR REPLACE TRIGGER trigger_set_updated_at_orders
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION set_updated_at_on_updated_data();

CREATE OR REPLACE TRIGGER trigger_set_updated_at_order_details
BEFORE UPDATE ON order_details
FOR EACH ROW
EXECUTE FUNCTION set_updated_at_on_updated_data();

--- separator

CREATE OR REPLACE FUNCTION validate_stock_change()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.stock_quantity < 0 THEN
      RAISE EXCEPTION 'Failed: Stock for book ID % cannot be less than 0 (Requested: %)', NEW.id, NEW.stock_quantity;
    END IF;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trigger_books_before_update
BEFORE UPDATE ON books
FOR EACH ROW
EXECUTE FUNCTION validate_stock_change();

