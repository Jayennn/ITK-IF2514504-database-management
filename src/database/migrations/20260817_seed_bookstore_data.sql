INSERT INTO books (title, author, price, stock_quantity)
VALUES
   ('Clean Code', 'Robert C. Martin', 120000, 20),
   ('The Pragmatic Programmer', 'David Thomas', 135000, 15),
   ('Design Patterns', 'Erich Gamma', 150000, 10),
   ('Introduction to Algorithms', 'Thomas H. Cormen', 250000, 8),
   ('Database System Concepts', 'Abraham Silberschatz', 180000, 12),
   ('Computer Networks', 'Andrew S. Tanenbaum', 200000, 7),
   ('Operating System Concepts', 'Abraham Silberschatz', 190000, 9),
   ('Artificial Intelligence', 'Stuart Russell', 220000, 6),
   ('Deep Learning', 'Ian Goodfellow', 230000, 5),
   ('Python Crash Course', 'Eric Matthes', 110000, 18);

INSERT INTO users (email, password, role)
VALUES
    ('admin@example.com', '$2b$04$S7gPEQXARQ4IeQWFcXHBpODQIZVj3sS0Yt80lel0jbfcLs3EfIzHi', 'admin'),
    ('anton@example.com', '$2b$04$S7gPEQXARQ4IeQWFcXHBpODQIZVj3sS0Yt80lel0jbfcLs3EfIzHi', 'customer')
ON CONFLICT (email) DO NOTHING;

INSERT INTO orders (user_id, order_date, created_at, updated_at)
VALUES
    (2, '2026-01-15', NOW(), NOW()),
    (2, '2026-02-10', NOW(), NOW());

INSERT INTO order_details (order_id, book_id, quantity, price, created_at, updated_at)
VALUES
    (1, 1, 2, 120000, NOW(), NOW()),
    (1, 3, 1, 150000, NOW(), NOW()),
    (2, 2, 1, 135000, NOW(), NOW()),
    (2, 5, 2, 180000, NOW(), NOW());