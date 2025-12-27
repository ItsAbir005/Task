# QR-Based Restaurant Menu System
A simple QR-based digital menu system for a restaurant. When a customer scans a QR code,
they should be redirected to a website where they can view menu items, add items to a cart, and
generate an order.

## Project Overview

This application allows restaurants to provide a contactless ordering experience. Customers scan a QR code at their table, which directs them to a web-based menu where they can browse items, manage their cart, and place orders.

## Features

### Customer Features
- **QR Code Scanning** - Scan table-specific QR codes
- **Cart Management** - Add, remove, and adjust quantities
- **Responsive Design** - Works on mobile, tablet, and desktop

### Technical Features
- MongoDB database for data persistence
- RESTful API architecture

## Tech Stack

### Frontend
- **React** 19.2.0 - UI framework
- **Tailwind CSS** 4.1.18 - Styling
- **Vite** 7.2.4 - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express** 5.2.1 - Web framework
- **MongoDB** - Database

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/ItsAbir005/Task.git
cd Task
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/db
JWT_SECRET=your_super_secret
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

Start the backend:
```bash
npm start
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## QR Code Setup

### Generating QR Code

1. **Install QR Code Generator** (in backend):
```bash
cd backend
npm install qrcode
```

2. **Create QR Code Generator Script** (`backend/generateQR.js`):
   - Copy the `generateQR.js` script provided in the artifacts
   - Save it in the `backend` folder

3. **Generate QR Code**:
```bash
cd backend
node generateQR.js
```

This will create:
- `qr-codes/restaurant-menu.png` - Main QR code (500px)
- `qr-codes/restaurant-menu-small.png` - Small version (300px)
- `qr-codes/restaurant-menu-large.png` - Large version (800px)

### QR Code URL

The QR code points to: `http://localhost:5173/login`

When scanned:
1. Automatically redirected to menu page
2. Customer can browse menu and place orders

## User Flow

1. **Customer scans QR code** placed at restaurant entrance, tables, or counter
2. **Browse menu** by category
3. **Add items to cart**
4. **Review cart** and adjust quantities
5. **Place order** - Order sent to system
6. **Order confirmation** shown with order ID
17. **View order history** in "My Orders"

## API Endpoints

### Menu
- `GET /api/menu` - Get all menu items 

### Orders
- `POST /api/order` - Create new order 
- `GET /api/order/my-orders` - Get user's orders





