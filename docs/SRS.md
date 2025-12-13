1. Introduction
1.1 Purpose

This document describes the functional and non-functional requirements of Valiant, a full-stack e-commerce platform designed to provide a secure, scalable, and user-friendly online shopping experience for customers and administrators.

1.2 Scope

Valiant enables users to browse products, manage carts and wishlists, place orders, and make secure online payments.
Administrators can manage products, users, and orders through a protected dashboard. The system is built using the MERN stack with performance optimizations using Redis.

2. Overall Description
2.1 Product Perspective

Valiant is a web-based application following a client-server architecture:

Frontend and Admin dashboards interact with backend APIs

Backend handles authentication, business logic, payments, and database operations

MongoDB stores persistent data

Redis improves performance via caching

2.2 User Classes

Customer: Browses products, places orders, tracks order status

Administrator: Manages products, users, and orders

3. Functional Requirements
3.1 User Authentication

Users shall be able to register and log in securely

JWT-based authentication shall be implemented

Role-based access control shall restrict admin routes

3.2 Product Management

Users shall be able to view products by category

Users shall be able to search products using text-based search

Admins shall be able to add, update, and delete products

3.3 Cart & Wishlist

Users shall be able to add products to cart

Users shall be able to manage wishlist items

Cart data shall persist across sessions

3.4 Order Management

Users shall be able to place orders

Users shall be able to view order history

Admins shall be able to update order status

3.5 Payment Processing

The system shall support online payments using Stripe and Razorpay

Payment transactions shall be securely handled via third-party gateways

4. Non-Functional Requirements
4.1 Performance

Frequently accessed data shall be cached using Redis

The system shall support concurrent users efficiently

4.2 Security

Passwords shall be securely hashed

Protected routes shall require authentication

Sensitive data shall be stored securely using environment variables

4.3 Scalability

The application shall be designed to support horizontal scaling

Future migration to microservices shall be possible

4.4 Reliability

The system shall handle failed payment or order scenarios gracefully

Proper error handling and validation shall be implemented

5. System Architecture

Frontend: React + Tailwind CSS

Backend: Node.js + Express.js

Database: MongoDB

Cache: Redis

Payments: Stripe, Razorpay

6. Assumptions & Constraints

Users require a modern web browser

Internet connectivity is required

Payment gateways depend on third-party availability

7. Future Enhancements

Dockerized deployment

Advanced search using Elasticsearch

Load balancing and auto-scaling

CI/CD pipeline integration