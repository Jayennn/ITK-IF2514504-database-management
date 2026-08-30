**Bun**, **TypeScript**, **Express**, and **PostgreSQL** (`PL/pgSQL`).
---
## Getting Started
### Installation
```bash
bun install
```

To run:
### Run Database Migrations
```bash
bun run migrate
```
### Start Development Server
```bash
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

## Implementation
### SQL Programming
- [x] Functions
- [x] Triggers
- [x] Stored Procedures
- [x] Views
- [ ] Role Revoke

### Indexing
- [x] B-Tree (default)
- [ ] Hash
- [ ] Bitmap
- [ ] Unclustered Index
- [ ] Clustered Index

### Transaction Processing

- [x] Transactions
- [x] Failure and Recovery
- [x] Concurrency and Control

### Extra Implementation
- [x] JSON

