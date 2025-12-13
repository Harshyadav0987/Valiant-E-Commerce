# Valiant – Full Stack E-Commerce Platform

Valiant is a production-oriented full-stack e-commerce platform built using the MERN stack.
It supports user authentication, product browsing, cart management, secure payments,
order tracking, and an admin dashboard with performance optimizations using Redis caching.

## Tech Stack

**Frontend**
- React
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis (Caching & Session Management)
- JWT Authentication

**Payments**
- Stripe
- Razorpay

**Other Tools**
- Docker (in progress)
- Git & GitHub

## Features

### User Features
- User authentication with JWT
- Product listing with category & text-based search
- Wishlist and cart functionality
- Secure checkout using Stripe and Razorpay
- Order placement and real-time order status tracking

### Admin Features
- Admin dashboard for managing products, users, and orders
- Order status updates (processing, shipped, delivered)
- Protected admin routes
- Optimized order fetching using Redis caching

### Performance & Security
- Redis caching for frequently accessed data
- Secure API routes with role-based access
- Password hashing and token-based authentication
- Optimized database queries using Mongoose

## Project Architecture

- Frontend communicates with backend via REST APIs
- Backend handles authentication, business logic, and payments
- MongoDB stores persistent data
- Redis is used for caching and session optimization
- Payment services handled via third-party gateways

## Installation & Setup

### Clone the repository

git clone https://github.com/Harahyadav0987/Valiant-E-Commerce.git
cd Valiant

##Backend Setup
cd Backend
npm install
npm run dev

##Frontend setup
cd Frontend
npm install
npm run dev

##Admin setup
cd admin
npm install
npm run dev

## API Overview

- POST /api/user/login
- POST /api/user/register
- GET  /api/product/list
- POST /api/order/place
- GET  /api/order/list (Admin)

## Future Improvements

- Dockerized deployment with Docker Compose
- Elasticsearch for advanced product search
- Load balancing and horizontal scaling
- Microservices-based architecture
- CI/CD pipeline setup

## Author

Harsh Yadav  
Computer Science & Design Student  
Skilled in Full-Stack Web Development (MERN)




