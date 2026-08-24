CREATE FUNCTION get_total_revenue_by_month(
    p_year INT,
    p_month INT
)
RETURNS DECIMAL 
LANGUAGE plpgsql
AS $$
DECLARE
    total_revenue DECIMAL;
BEGIN
    SELECT 
        SUM(orders.quantity * books.price)
    INTO total_revenue
    FROM orders
    INNER JOIN books
        ON orders.book_id = books.id
    WHERE EX    TRACT(YEAR FROM orders.order_date) = p_year 
        AND EXTRACT(MONTH FROM orders.order_date) = p_month
    
    RETURN COALESCE(total_revenue, 0)
END;
$$;