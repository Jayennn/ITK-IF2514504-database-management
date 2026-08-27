CREATE OR REPLACE VIEW vw_order_summary AS
SELECT
    orders.id AS order_id,
    users.email AS customer_email,
    orders.order_date,
    COUNT(order_details.id) AS total_items,
    SUM(order_details.quantity * order_details.price) AS total_price
FROM orders
INNER JOIN users
    ON orders.user_id = users.id
LEFT JOIN order_details
    ON orders.id = order_details.order_id
GROUP BY
    orders.id,
    users.email,
    orders.order_date
ORDER BY orders.id DESC;

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
ORDER BY total_sold DESC;

-- ============================================================
-- View: vw_customer_spending
-- Tujuan: Total pengeluaran tiap customer
-- Digunakan oleh: GET /api/v1/reports/revenue (breakdown per user)
-- ============================================================
-- CREATE OR REPLACE VIEW vw_customer_spending AS
-- SELECT
--     users.id AS user_id,
--     users.email,
--     COUNT(DISTINCT orders.id) AS total_orders,
--     COALESCE(SUM(order_details.quantity), 0) AS total_items_bought,
--     COALESCE(SUM(order_details.quantity * order_details.price), 0) AS total_spent
-- FROM users
-- LEFT JOIN orders
--     ON users.id = orders.user_id
-- LEFT JOIN order_details
--     ON orders.id = order_details.order_id
-- WHERE users.role = 'customer'
-- GROUP BY
--     users.id,
--     users.email
-- ORDER BY total_spent DESC;