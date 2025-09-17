# React + Node Task: Student Management with 2-Level Encryption

This project is a **full-stack MERN application** built with **React (TypeScript)** for the frontend and **Node.js + Express (TypeScript)** for the backend.  
It implements a **Login system** and **Student Registration with CRUD operations**, using **2-level encryption** for data security.

---

## 🚀 Features
- **Login Form**
  - Email & Password validation
- **Student Registration Form**
  - Fields: Full Name, Email, Phone, DOB, Gender, Address, Course, Password
  - Client-side + Server-side validation
- **CRUD Operations**
  - Create new student
  - Read student list
  - Update student
  - Delete student
- **2-Level Encryption**
  - Frontend encrypts user data before sending to backend
  - Backend encrypts again before storing in MongoDB
  - While fetching: Backend decrypts one level → sends encrypted data → Frontend decrypts final level

---

## 🛠 Tech Stack
### Frontend
- React + TypeScript
- Vite
- TailwindCSS + MUI
- React Hook Form + Yup (form validation)
- Axios
- CryptoJS (AES encryption)

### Backend
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- CryptoJS
- CORS + dotenv

---

## 🔐 Encryption Implementation
1. **Frontend**:  
   - Encrypt data with AES before sending API request (`crypto-js`).  
   - Passwords and emails additionally hashed with SHA256.  

2. **Backend**:  
   - Decrypt frontend AES-encrypted payload.  
   - Apply second layer of AES encryption.  
   - Store final encrypted data in MongoDB.  

3. **Fetching Students**:  
   - Backend decrypts one level.  
   - Sends partially decrypted data to frontend.  
   - Frontend decrypts final level before displaying.  

---


