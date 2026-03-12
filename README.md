# Mini CRM — Client Lead Management System

A full-stack Client Lead Management System (Mini CRM) built as part of the Future Interns Full Stack Web Development Internship — Task 2.

---

##  Live Demo

- **Frontend:** https://janegathu-crm.netlify.app
- **Backend API:** https://janegathu-crm-api.onrender.com

---

##  Project Overview

For Task 2 of my Future Interns internship, I built a Mini CRM to manage 
client leads that come in through a website contact form. Having built my 
portfolio site in Task 1, I wanted a real tool to track and follow up on 
anyone who reaches out to me. The app has a secure admin login, a full 
leads dashboard and dark and light mode support.

---

##  Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Auth
- JSON Web Tokens (JWT)
- bcryptjs

---

## ✅ Key Features

-  Secure admin login with JWT authentication
-  Lead listing with name, email, phone, source, status and notes
-  Add new leads via a modal form
-  Edit existing leads
-  Delete leads with confirmation
-  Lead status updates — New / Contacted / Converted / Lost
-  Search leads by name or email
-  Dashboard overview with stat cards and recent leads
-  Dark and light mode toggle
-  Toast notifications for all actions
-  Responsive layout with sidebar navigation

---

##  Project Structure
```
FUTURE_FS_02/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT auth middleware
│   ├── models/
│   │   └── Lead.js          # MongoDB Lead schema
│   ├── routes/
│   │   ├── auth.js          # Login route
│   │   └── leads.js         # CRUD routes for leads
│   ├── .env                 # Environment variables
│   ├── server.js            # Express server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LeadModal.jsx
│   │   │   ├── LeadTable.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

---

##  Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed and running locally
- Git installed

---

### 1. Clone the repository
```bash
git clone https://github.com/JANE-dot978/FUTURE_FS_02.git
cd FUTURE_FS_02
```

---

### 2. Setup the Backend
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/minicrm
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=your_admin_email@gmail.com
ADMIN_PASSWORD=your_admin_password
```

Start the backend:
```bash
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on port 5000
```

---

### 3. Setup the Frontend

Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Open your browser at:
```
http://localhost:5173
```

---

##  Admin Login

Use the credentials you set in your `.env` file to log in.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/login | Admin login | No |
| GET | /api/leads | Get all leads | Yes |
| POST | /api/leads | Create a new lead | Yes |
| PUT | /api/leads/:id | Update a lead | Yes |
| DELETE | /api/leads/:id | Delete a lead | Yes |

---

##  Skills Gained

- CRUD operations with MongoDB and Mongoose
- REST API development with Node.js and Express
- JWT authentication and protected routes
- React state management and component architecture
- Axios for API integration
- Responsive UI design with dark and light mode

---

##  Author

**Jane Wanjiku Gathu**
 gathujane97@gmail.com
 GitHub: https://github.com/JANE-dot978
 Portfolio: https://janegathu.netlify.app
Future Interns — Full Stack Web Development Internship — Task 2
---

##  License

This project was built for educational purposes as part of the Future Interns internship program.