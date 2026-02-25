# Sentient Backend - API Service

A TypeScript + Express backend API powering the Sentient band content management platform. This service provides authentication, release managment, and media handling through a RESTful interface consumed by the frontend application

Frontend repository:
[Sentient Frontend](https://github.com/sentient-band-site/frontend/)

---

## System Role
The backend acts as the authoritative service layer responsible for:
- Authenticating users and issuing JWT tokens
- Enforcing role-based access control
- Managing release data in PostgreSQL via Prisma ORM
- Handling media uploads and retrieval through Supabase Storage
- Protecting sensitive operations behind middleware guards

The frontend communicates exclusibley with this API and does not access the database or storage layer directly.

---

## Features

- **JWT Authentication** - Credential-based login; HTTP-only cookie token storage; Middleware-protected routes
- **Release Management API** - Full CRUD Operations for music and video releases; Prisma ORM managing PostgreSQL schema
- **Supabase Storage Integration** - Image upload and deletion; Signed URL generation for protected assets; Public URL handling where appropriate
- **Role-Based Access** - `authenticateToken` middleware for user verification; `requireAdmin` middleware for restricted endpoints
- **TypeScript Service Layer** - Typed controllers and route handlers; Structured request/response handling

---

## Architecture Overview
The backend follows a layered structure:
- **Routing Layer** - Defines REST endpoints
- **Middleware Layer** - Handles authentication and authorization
- **Controller Layer** - Implements business logic
- **Service / ORM Layer** - Interfaces with PostgreSQL via Prisma
- **Storage Integration Layer** - Manages Supabase bucket operations

This separation ensures maintainability, testability and secure handling of user and media data.

---

## Tech Stack

### **Runtime and Framework** 
#### ![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
#### ![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=fff&style=flat)
### **Language**
#### ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
### **ORM**
#### ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
### **Database** 
#### ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
### **Storage and Hosting**
#### ![Supabase](https://shields.io/badge/supabase-black?logo=supabase&style=for-the-badge)
### **Authentication**
#### JWT (HTTP-only cookies)

---

## Project Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v22.6.0+)
- **npm** (v10.8.2+)

### Installation

1. **Clone the repository**:
    ```bash
    git clone [https://github.com/sentient-band-site/backend.git]
    cd backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    npm run dev
    ```
3. **Required Environment Variables**:
    ```
    JWT_SECRET=your_jwt_secret_key
    FRONTEND_URL=http://localhost:[frontend port]

    # Connection to Supabase via connection pooling
    DATABASE_URL=http://postgresql:postgres.[supabase project key, pass and database locale]
    # Direct connection to the database for migrations
    DIRECT_URL=http://postgresql:postgres.[supabase project key, pass and database locale]

    SUPABASE_URL=https://your-project-ref.supabase.co
    SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
    SUPABASE_BUCKET_NAME=artwork
    ```

4. **Prisma Setup**:
   ```
   npx prisma generate
   npx prisma migrate dev
   ```
   
5. **Run the application**:
    ```bash
    npm run dev
    ```

    The application will be accessible at `http://localhost:4000`.
