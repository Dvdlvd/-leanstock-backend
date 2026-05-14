# LeanStock Backend

Production-grade inventory management backend built with:

- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- RBAC Authorization
- Swagger/OpenAPI

---

## Features

- JWT authentication
- Refresh tokens
- Role-based access control
- Email verification
- Password reset
- Product inventory management
- Pagination/filtering/sorting
- Swagger documentation
- Multi-tenant architecture
- Low stock detection

---

## Setup

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create `.env` file:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/app

JWT_SECRET=your_jwt_secret

JWT_REFRESH_SECRET=your_refresh_secret

PORT=3000

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_email_password
```

---

## Database Migration

```bash
npx prisma migrate dev
```

---

## Run Server

```bash
npm run dev
```

Server runs at:

```txt
http://localhost:3000
```

Swagger documentation:

```txt
http://localhost:3000/api-docs
```

---

## Authentication Flow

1. Register user
2. Verify email
3. Login
4. Receive JWT tokens
5. Access protected routes
6. Refresh tokens
7. Logout

---

## Roles

- ADMIN
- MANAGER
- STAFF
- VIEWER

---

## Product Features

- Create product
- Update inventory
- Delete product
- Pagination
- Search
- Sorting
- Low stock detection

---

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT
- Swagger UI
- Nodemon

---

## API Testing

Swagger UI:

```txt
http://localhost:3000/api-docs
```

Postman collection included:

```txt
postman-collection.json
```

---

## Author

Kaisar Askaruly