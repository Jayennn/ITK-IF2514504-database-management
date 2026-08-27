CREATE OR REPLACE VIEW vw_order_summary AS
SELECT
    orders.id AS order_id,
    users.email AS customer_email,
    orders.order_date,
    COALESCE(SUM(order_details.quantity), 0) AS total_items,
    COALESCE(SUM(order_details.quantity * order_details.price), 0) AS total_price
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
ORDER BY total_sold DESC
LIMIT 5;