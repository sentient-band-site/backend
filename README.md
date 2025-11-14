# Sentient Backend - API Service

A secure TypeScript + Express backend API poweing the Sentient band website. Handles JWT authentication, image uploads, Supabase storage, Prisma, and protected admin routes for managing releases and media announcements.

This backend exposes RESTful endpoints utilizied by the [Sentient Frontend](https://github.com/sentient-band-site/frontend/)

---

## Features

- **JWT Authentication** - Login and protected admin routes; credential-based auth with session tokens via HTTP-only cookies
- **Release Management API** - CRUD operations for music/video releases; Prisma ORM with PostgreSQL
- **Supabase Storage Integration** - Upload, sign, retrieve, delete images; automatically returns public or signed URLs
- **Role-Based Access** - authenticateToken protects user routes; requireAdmin restricts sensitive endpoints
- **Fully Typed** - Uses TypeScript from end to end; Shared types between controllers and routes

---

## Tech Stack

### **Backend Framework** 
#### ![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
#### ![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=fff&style=flat)
### **Language**
#### ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
### **ORM**
#### ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
### **Database** 
#### ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
### **Filestorage and Database Hosting**
#### ![Supabase](https://shields.io/badge/supabase-black?logo=supabase&style=for-the-badge)
### **Authentication** | JWT
