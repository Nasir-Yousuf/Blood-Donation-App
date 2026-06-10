# 🩸 Blood Donation Application

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://blood-donation-app-1ecj-nasiryousufs-projects.vercel.app/)

A full-stack application designed to connect blood donors with people in need through location-based search, real-time request handling, and secure authentication.

---

## 🚀 Features

- **🔐 JWT Authentication & Authorization**: Secure login and route protection.
- **👤 User Profiles**: Seamless registration, login, and profile management.
- **🔍 Geospatial Search**: Find nearby donors using MongoDB's `2dsphere` index for accurate location matching.
- **🩸 Request Lifecycle**: Create, accept, and fulfill blood requests in real-time.
- **📊 User Dashboard**: View history of donations and requested blood.
- **🚑 Cooldown System**: Built-in logic to restrict donation frequencies safely:
  - ♂️ Male: 90 days
  - ♀️ Female: 120 days

---

## 🛠 Tech Stack

### Frontend (Client)
- **Next.js (App Router)** - Upgraded from Vite/React for better performance and routing.
- **React 19**
- **Tailwind CSS**
- **Redux Toolkit** - State management
- **Axios** - Data fetching

### Backend (Server)
- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing

---

## 🧠 System Architecture

**1. Request Creation:** A recipient creates a blood request with their location and blood type.
**2. Discovery:** Donors query the system and see requests within a specific radius, sorted by distance.
**3. Acceptance:** A donor accepts the request, changing its status and assigning it to them.
**4. Fulfillment:** After the donation occurs, the request is marked as fulfilled.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Nasir-Yousuf/Blood-Donation-App.git
cd Blood-Donation-App
```

### 2. Install Dependencies
This project uses a monorepo setup. You need to install dependencies for both the client and the server.
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..

# Install server dependencies
cd server
npm install
cd ..
```

### 3. Setup Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### 4. Run the Application Locally
You can run both the frontend and backend concurrently from the root directory:
```bash
npm run dev
```
> The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

---

## 🌐 Deployment

- **Frontend**: [Live on Vercel](https://blood-donation-app-1ecj-nasiryousufs-projects.vercel.app/)
- **Backend**: Hosted on [Render](https://render.com)
  - API Base URL: `https://blood-donation-app-c6ft.onrender.com/api/v1`

---

## 📡 API Overview

Protected routes require a JWT token in the headers:
`Authorization: Bearer <your_jwt_token>`

### 🔐 Authentication Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/users/register` | Register a new user |
| POST | `/api/v1/users/login` | Login user |
| GET | `/api/v1/users/me` | Get current logged-in user |
| PATCH| `/api/v1/users/updateMe` | Update user profile |

### 🩸 Blood Request Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/requests` | Create a new blood request |
| PATCH| `/api/v1/requests/:id/accept` | Accept a blood request |
| PATCH| `/api/v1/requests/:id/fulfill`| Mark request as fulfilled |
| GET | `/api/v1/requests/my-requests` | List user’s requests |
| GET | `/api/v1/requests/my-donations`| List requests accepted by donor |

### 🗺️ Discovery / Geospatial Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/users/donors-within/:distance/center/:latlng` | Find nearby donors |
| GET | `/api/v1/requests/nearby/:distance` | Find nearby blood requests |

---

## 🎯 Future Improvements
- 💬 Real-time chat via Socket.io
- 🔔 In-app & email notifications
- 📱 React Native mobile application
- ⭐ Donor rating and review system
- 🤖 AI-based donor recommendations

---

## 👨‍💻 Author
**Nasir Yousuf**
*Content Head @ Social Tamai*
Passionate about building real-world scalable applications to solve real problems.

⭐ **Support:** If you found this project helpful or inspiring, consider giving it a ⭐ on GitHub!
