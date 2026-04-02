🩸 Blood Donation Application

A full-stack MERN application designed to connect blood donors with people in need through location-based search, real-time request handling, and secure authentication.

⸻

🚀 Features
• 🔐 JWT Authentication & Authorization
• 👤 User Registration & Login
• 🔍 Find Donors by Blood Type & Location
• 🩸 Create & Manage Blood Requests
• 📍 Geospatial Search (2dsphere index)
• 🚑 Request Lifecycle: Create → Accept → Fulfill
• 📊 User Dashboard (Donations & Requests History)
• 🗺️ Location-aware matching system
• ⚡ Monorepo setup (client + server)

⸻

🧠 System Architecture (How It Works)

The Core Flow 1. Request Creation
A recipient creates a blood request with location and blood type. 2. Discovery
Nearby donors query the system and see requests within a specific radius (e.g., 10km), sorted by distance. 3. Acceptance
A donor accepts the request → request status becomes accepted and is assigned to that donor. 4. Fulfillment
After donation, the request is marked as fulfilled. 5. Cooldown System
Donors are temporarily unavailable:
• ♂️ Male: 90 days
• ♀️ Female: 120 days

⸻

🛠 Tech Stack

Frontend (Client)
• React / Vite
• Tailwind CSS
• React Router

Backend (Server)
• Node.js
• Express.js
• MongoDB + Mongoose
• JWT (Authentication)
• bcrypt (Password hashing)

📁 Project Structure
blood-donation-app/
├── client/ # React frontend
├── server/ # Node.js backend API
├── docs/ # (optional) documentation files
├── README.md
├── package.json # root scripts (concurrently)

⚙️ Installation & Setup

1. Clone the Repository
   git clone https://github.com/your-username/blood-donation-app.git
   cd blood-donation-app

2. Install Dependencies
   npm run install-all
   Or manually:
   cd server && npm install
   cd ../client && npm install

3. Setup Environment Variables
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key

4. Run the Application
   npm run dev
   👉 This runs both client + server using concurrently

🔐 Authentication
Protected routes require a JWT token in headers:
Authorization: Bearer <your_jwt_token>

## 📡 API Overview

The Blood Donation Application API provides secure endpoints for user management, blood requests, and geospatial discovery.

---

### 🔐 Authentication Routes

| Method | Endpoint                 | Description                |
| ------ | ------------------------ | -------------------------- |
| POST   | `/api/v1/users/register` | Register a new user        |
| POST   | `/api/v1/users/login`    | Login user                 |
| GET    | `/api/v1/users/me`       | Get current logged-in user |
| PATCH  | `/api/v1/users/updateMe` | Update user profile        |

**Notes:**

- Protected routes require a JWT token in headers:  
  `Authorization: Bearer <your_jwt_token>`

---

### 🩸 Blood Request Routes

| Method | Endpoint                        | Description                     |
| ------ | ------------------------------- | ------------------------------- |
| POST   | `/api/v1/requests`              | Create a new blood request      |
| PATCH  | `/api/v1/requests/:id/accept`   | Accept a blood request          |
| PATCH  | `/api/v1/requests/:id/fulfill`  | Mark request as fulfilled       |
| GET    | `/api/v1/requests/my-requests`  | List user’s requests            |
| GET    | `/api/v1/requests/my-donations` | List requests accepted by donor |

---

### 🗺️ Discovery / Geospatial Routes

| Method | Endpoint                                               | Description                |
| ------ | ------------------------------------------------------ | -------------------------- |
| GET    | `/api/v1/users/donors-within/:distance/center/:latlng` | Find nearby donors         |
| GET    | `/api/v1/requests/nearby/:distance`                    | Find nearby blood requests |

---

### 📌 Notes on API

- All endpoints follow REST conventions.
- Geospatial queries use MongoDB `2dsphere` indexes for accurate location-based searching.
- Request lifecycle: `Created → Accepted → Fulfilled`.
- Donor cooldown system:
  - ♂️ Male: 90 days
  - ♀️ Female: 120 days
    📌 Current Status
    • ✅ Backend API Completed
    • ✅ Authentication & Authorization
    • ✅ Geospatial Queries Implemented
    • 🚧 Messaging system (planned)
    • 🚧 Notifications system (planned)

⸻

🎯 Future Improvements
• 💬 Real-time chat (Socket.io)
• 🔔 In-app & email notifications
• 📱 React Native mobile app
• ⭐ Donor rating system
• 🤖 AI-based donor recommendations

⸻

🌐 Deployment
• Backend → Render (planned)
• Frontend → Vercel / Netlify (planned)

⸻

💡 Inspiration

Built to solve real-world problems by enabling fast and efficient connection between blood donors and recipients using location intelligence.

⸻

👨‍💻 Author

Nasir
Content Head @ Social Tamai
Passionate about building real-world scalable applications

⸻

⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
:::
