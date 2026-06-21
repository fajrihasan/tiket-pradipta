# PRADIPTA 2026 — Spark of Radiance Ticketing & Merchandise Platform

The official Ticketing and Merchandise platform for the **PRADIPTA 2026 - Spark of Radiance** event, the farewell and graduation celebration for the class of 2026 at SMK Negeri 5 Malang. This application is built using a modern stack featuring Next.js 15+, Tailwind CSS v4, and Supabase to provide a seamless, secure, and real-time ticket purchasing experience.

---

## 🌌 Project Overview

PRADIPTA 2026 represents a beautiful conclusion to a high school journey and a radiant beginning for the future of the class of 2026 at SMK Negeri 5 Malang. This platform facilitates online ticket bookings (including VIP and regular tickets) and exclusive merchandise sales. The system features multi-channel payment integrations, automated email delivery of digital tickets, and a QR Code ticket verification (check-in) module for staff on-site.

---

## 🚀 Key Features

### 1. Ticket Booking & Payment Integration
*   **Dual Payment Gateway**:
    *   **Midtrans Gateway**: Automated online payments (supporting QRIS, GoPay, DANA, BCA Virtual Account, and other bank transfers).
    *   **Manual Transfer**: Alternative payment option via manual bank transfer with custom payment codes and unique transfer amounts for easier admin verification.
*   **Countdown Timer**: Interactive live countdown timer targeting the event day on the main page.
*   **Interactive Ticket UI**: Premium physical-ticket styling on the landing page complete with perforation lines (*tear line*) and smooth hover/micro-interaction animations.

### 2. E-Merchandise Store (`/merch`)
*   A catalog featuring exclusive PRADIPTA 2026 merchandise products with a dynamic, responsive, and modern interface.

### 3. Automated Ticket Delivery (Nodemailer)
*   The system automatically generates a unique digital ticket with its QR Code and emails it to the buyer once the order status is verified as `PAID`.

### 4. QR Code Scanning & Staff Module (`/panitia`)
*   **Dedicated Staff View**: A layout for on-site staff to scan and check-in tickets at the venue.
*   **Real-time Scan**: Directly uses the device's camera via the `html5-qrcode` library to scan visitors' digital tickets.
*   **Instant Verification**: Automatically updates the ticket's usage status (`is_used`) and timestamp (`used_at`) in Supabase on a successful scan, preventing double entries.

### 5. Comprehensive Admin Dashboard (`/admin`)
A centralized admin hub to manage the event logistics and sales:
*   **Main Dashboard**: High-level statistical summaries of total orders and sales.
*   **Events Manager** (`/admin/events`): Add, update, and remove events, details, dates, and locations.
*   **Orders Manager** (`/admin/orders`): Monitor all incoming order transactions, customer details, and selected payment methods.
*   **Payments Manager** (`/admin/payments`): Verify manual bank transfer orders and transition their statuses to `PAID` (which triggers ticket generation and email dispatch).
*   **Tickets Manager** (`/admin/tickets`): Track and view all issued tickets and their check-in statuses.

---

## 🛠️ Tech Stack

This application is built with the following technologies:

*   **Primary Framework**: [Next.js 15+](https://nextjs.org/) (App Router, React 19)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/postcss` for exceptionally fast CSS generation and fluent micro-animations.
*   **Database & Authentication**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security (RLS) policies for secure data access).
*   **Payment Gateway**: [Midtrans Client API](https://midtrans.com/)
*   **Email Dispatch**: [Nodemailer](https://nodemailer.com/)
*   **QR Code Utilities**: `qrcode` (generation) & `html5-qrcode` (real-time camera scanning/decoding).
