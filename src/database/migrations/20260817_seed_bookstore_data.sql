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

-- INSERT INTO customers (name, signup_date) VALUES
-- ('Andi Pratama', '2026-01-10'),
-- ('Budi Santoso', '2026-01-15'),
-- ('Citra Lestari', '2026-02-01'),
-- ('Dewi Anggraini', '2026-02-12'),
-- ('Eko Wijaya', '2026-03-05');

-- INSERT INTO orders (customer_id, book_id, order_date, quantity) VALUES
-- (1, 3, '2025-01-15', 2),
-- (2, 1, '2025-02-08', 1),
-- (3, 5, '2025-03-21', 3),
-- (4, 2, '2025-04-12', 1),
-- (5, 4, '2025-05-27', 2),

-- (1, 5, '2025-07-06', 1),
-- (2, 3, '2025-08-19', 2),
-- (3, 1, '2025-10-03', 1),
-- (4, 4, '2025-11-14', 3),
-- (5, 2, '2025-12-22', 2),

-- (2, 5, '2026-01-09', 1),
-- (3, 4, '2026-02-17', 2),
-- (1, 2, '2026-04-05', 3),
-- (5, 3, '2026-05-18', 1),
-- (4, 1, '2026-06-24', 2),

-- (3, 5, '2026-07-11', 1),
-- (1, 4, '2026-08-02', 2),
-- (2, 2, '2026-09-16', 1),
-- (5, 1, '2026-10-28', 3),
-- (4, 3, '2026-12-07', 2);    