CREATE OR REPLACE FUNCTION get_total_revenue_by_month(
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
      SUM(order_details.quantity * books.price)
    INTO total_revenue
    FROM orders
    INNER JOIN order_details
      ON orders.id = order_details.order_id
    INNER JOIN books
      ON order_details.book_id = books.id
    WHERE EXTRACT(YEAR FROM orders.order_date) = p_year AND EXTRACT(MONTH FROM orders.order_date) = p_month;
    
    RETURN COALESCE(total_revenue, 0);
END;
$$;