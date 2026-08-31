CREATE OR REPLACE VIEW vw_all_books AS
SELECT
    books.id AS book_id,
    books.title,
    books.author,
    books.price,
    books.stock_quantity,
    books.created_at,
    books.updated_at
FROM books
ORDER BY books.id ASC;

CREATE OR REPLACE VIEW vw_all_orders AS
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
ORDER BY orders.id ASC;

-- Laporan ringkasan pendapatan per bulan (untuk endpoint reports/dashboard)
CREATE OR REPLACE VIEW vw_monthly_revenue_summary AS
SELECT
   EXTRACT(YEAR FROM orders.order_date)::INT AS year,
   EXTRACT(MONTH FROM orders.order_date)::INT AS   month,
   COUNT(DISTINCT orders.id) AS total_orders,
   COUNT(DISTINCT orders.user_id) AS unique_customers,
   COALESCE(SUM(order_details.quantity), 0) AS total_items_sold,
   COALESCE(SUM(order_details.quantity * order_details.price), 0) AS total_revenue,
   COALESCE(
      ROUND(
         SUM(order_details.quantity * order_details.price) 
         / NULLIF(COUNT(DISTINCT orders.id), 0),
         2),
      0) AS avg_order_value
FROM orders
LEFT JOIN order_details
    ON orders.id = order_details.order_id
GROUP BY
    EXTRACT(YEAR FROM orders.order_date),
    EXTRACT(MONTH FROM orders.order_date)
ORDER BY year DESC, month DESC;

CREATE OR REPLACE VIEW vw_top_selling_books AS
SELECT
    books.id AS book_id,
    books.title,
    books.author,
    books.price,
    books.stock_quantity AS remaining_stock,
    COALESCE(SUM(order_details.quantity), 0) AS total_sold,
    COALESCE(SUM(order_details.quantity * order_details.price), 0) AS total_revenue
FROM books
LEFT JOIN order_details
    ON books.id = order_details.book_id
GROUP BY
    books.id,
    books.title,
    books.author,
    books.price,
    books.stock_quantity
ORDER BY total_sold DESC
LIMIT 5;