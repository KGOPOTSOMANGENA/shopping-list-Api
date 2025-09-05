🛒 Shopping List App

A full-stack Shopping List application built with Node.js, Express, TypeScript, and React + Vite.
Users can register, manage shopping items (create, read, update, delete), and track purchased items.

📝 Project Description

Shopping List App is a full-stack application that allows users to manage shopping items efficiently.

Backend (API)

Built with Node.js, Express, and TypeScript

Users can register, update their profile, and look up by email

Supports CRUD operations for shopping items: create, read, update, delete

Items track quantity, category, purchased status, and date added

Returns consistent JSON responses for errors and successes

Uses CORS and Body Parser for frontend communication

Runs on http://localhost:5000
 by default

Frontend (React + Vite)

Simple UI to view, add, edit, delete.

Communicates with the backend API using HTTP requests

Responsive design for easy testing

Key points:

Users and items are stored in memory (arrays); data resets on server restart

Tested with Postman or the frontend UI

Easy to run locally using npm run dev:server for backend and npm run dev for frontend

📌 Features
Backend (API)

User registration and lookup

Add, read, update, delete shopping items

Error handling with consistent JSON responses

Tested with Postman

Frontend (React)

Add, edit, delete,

Responsive and simple interface

Connects to backend API automatically

🛠️ Technologies Used

Backend: Node.js, Express, TypeScript, ts-node, nodemon, body-parser, cors

Frontend: React, Vite, TypeScript

Dev Tools: Postman, ESLint

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/KGOPOTSOMANGENA/shopping-list-Api.git
cd shopping-list-Api
npm install
npm run dev:server
npm run dev
