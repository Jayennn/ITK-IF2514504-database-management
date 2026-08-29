# ITK Database Management - Bookstore API
To install dependencies:
A database-first RESTful API built with **Bun**, **TypeScript**, **Express**, and **PostgreSQL** (`PL/pgSQL`).
---
## Getting Started
### Installation
```bash
bun install
bun install
```

To run:
### Run Database Migrations
```bash
bun run migrate
```
### Start Development Server
```bash
bun run index.ts
bun dev
```

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
### Code Formatting & Quality Check
```bash
bun run format
bun run check
```

---
## Task Checklist & Implementation Status
### Modules & API Endpoints
- [x] **Auth Module** (`/api/v1/auth`)
  - [x] `POST /register` – Register new user
  - [x] `POST /login` – Login & issue JWT token
  - [x] `GET /profile` – Retrieve authenticated user profile
  - [ ] `POST /logout` - Invalidate JWT token (optional)
- [ ] **Users Module** (`/api/v1/users`)
  - [ ] `GET /` – Get all users (Admin only)
  - [ ] `GET /:id` – Get user details by ID (Admin only)
  - [ ] `PUT /:id` – Update user details
  - [ ] `DELETE /:id` – Delete user (Admin only)
- [x] **Books Module** (`/api/v1/books`)
  - [x] `GET /` – Get all books
  - [x] `GET /:id` – Get book details by ID 
  - [x] `POST /` – Create new book (Admin only)
  - [x] `PUT /:id` – Update book (Admin only)
  - [x] `DELETE /:id` – Delete book (Admin only)
- [x] **Orders Module** (`/api/v1/orders`)
  - [x] `POST /` – Place order checkout
  - [x] `GET /` – Get all orders
  - [x] `GET /:id` - Get all detail order
  - [x] `DELETE /:id` – Cancel order
- [x] **Reports & Analytics Module** (`/api/v1/reports`)
  - [x] `GET /revenue` – Monthly revenue analytics
  - [x] `GET /top-selling` – Top selling books report
---
### Database Implementations
#### Stored Procedures & Functions (`PL/pgSQL`)
- [x] `register_user` – Procedure to register users with default customer role
- [x] `get_user_with_password_by_email` – Function returning user record for authentication
- [x] `get_all_books` – Function returning table of all books
- [x] `get_book_by_id` – Function returning book by primary key
- [x] `create_book` – Procedure inserting a new book with input validation
- [x] `update_book` – Procedure updating book details with partial payload support
- [x] `delete_book` – Procedure removing book by ID
- [x] `process_order_checkout` – Procedure handling atomic checkout, stock locking & updates
- [x] `get_customer_purchase_summary` – Function aggregating customer purchase statistics
- [x] `get_total_revenue_by_month` – Function calculating total revenue for a given year & month
#### Database Views
- [x] `vw_order_details` – Joined view of orders, customer names, book titles, and sub-totals
- [x] `vw_customer_orders` – View summarizing total orders and total spent per customer
- [x] `vw_top_selling_books` – View ranking books by units sold
#### Database Indexes (B-Tree Performance Optimization)
- [x] B-Tree Primary Key Indexes on `users(id)`, `books(id)`, `orders(id)`, `order_details(id)`
- [x] B-Tree Unique Index on `users(email)`
- [ ] B-Tree Index on `books(title, author)` for search performance
- [ ] B-Tree Index on `orders(user_id)` for foreign key lookup acceleration
- [ ] B-Tree Composite Index on `order_details(order_id, book_id)`
---
### Security & Middleware
- [x] **JWT Authentication Middleware** – Extract & verify `Bearer` tokens with `jose`
- [x] **Role-Based Access Control (RBAC)** – Restrict endpoints (`admin` vs `customer`)
- [x] **Input Validation** – Zod schema validation for request params and bodies

## Implementation
### SQL Programming
- [x] Functions
- [x] Triggers
- [x] Stored Procedures
- [x] Views
- [_] Role Revoke

### Indexing
- [_] B-Tree
- [_] Hash
- [_] Bitmap
- [_] Unclustered Index
- [_] Clustered Index

### Transaction Processing

- [_] Transactions
- [_] Failure and Recovery
- [_] Concurrency and Control

### Extra Implementation
- [_] JSON

