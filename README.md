# Smart Marketplace

![image](https://github.com/user-attachments/assets/623b6308-4228-4d3e-8ffa-3ffec27925dd)


Smart Marketplace is a professional, full-stack job portal platform designed to connect clients with freelancers through intelligent automation. It leverages the power of the **Groq API** to transform simple prompts into detailed job offers, simplifying project creation and matching.

---
## ✍️ Done by 
**- Mohamed BARBYCH**
**- Mouaad ELHANSALI**

## ✨ Key Features

- 🔐 **Secure Authentication**: JWT-based login and registration system.
- 🛂 **Role-Based Access**: Admins vs Regular Users.
- 🤖 **AI Job Creation**: Generate full job descriptions from simple prompts using Groq.
- 📋 **Job Management**: Create, edit, delete, and publish jobs.
- 📊 **Admin Dashboard**: Full control panel for managing users and jobs.
- 🔗 **REST API**: Clean, scalable API to connect frontend and backend.
![image](https://github.com/user-attachments/assets/af807113-30cd-4fa8-bfa8-3454b5ebcab3)

---

## 🏗️ System Architecture

- **Frontend** (`/frontend`): React + Vite + TypeScript UI.
- **Backend** (`/SmartMarketplace`): ASP.NET Core 8 API.
![image](https://github.com/user-attachments/assets/6d6cf8c7-02be-4c29-8d83-4fc29cf3de0c)

---
## 👁‍🗨 App Overview
![image](https://github.com/user-attachments/assets/1bf3568f-133d-41d4-ae24-04f1a8012109)

![image](https://github.com/user-attachments/assets/27c03baf-762f-4af9-baa1-1f0f50702985)

![image](https://github.com/user-attachments/assets/2c10f3d4-28b9-4fcb-b69a-806cfc141c43)

![image](https://github.com/user-attachments/assets/d7c9a36c-fcf2-4de9-abcf-e14351b49fb2)

![image](https://github.com/user-attachments/assets/a9941c15-1857-4947-9f96-bd20294d56d9)

---
## ⚙️ Tech Stack

### Backend
- **Language**: C# 12
- **Framework**: ASP.NET Core 8
- **Database**: MySQL (via Pomelo)
- **Authentication**: JWT Bearer Tokens + BCrypt.Net
- **AI Integration**: Groq API

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Bootstrap 5
- **Routing**: React Router
- **HTTP**: Axios

---

## 🖥️ Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js v18+](https://nodejs.org/)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- [VS Code](https://code.visualstudio.com/) or [JetBrains Rider](https://www.jetbrains.com/rider/)

---

## 🛠️ Setup Guide

### 1. Clone Repository
```bash
git clone https://github.com/khalilh2002/Smart_marketplace.git
cd Smart_marketplace
```

### 2. Backend Setup
```bash
cd SmartMarketplace
```

Edit `appsettings.json` with:
```json
{
  "ConnectionStrings": {
    "Default": "Server=127.0.0.1;User=market_admin;Password=SecureP@ssw0rd123!;Database=SmartMarketplaceDB"
  },
  "Groq": {
    "ApiKey": "gsk_cfc8xMnWcLApk9ZP0y6tUFbvC1MyQ1FyLz"
  },
  "Jwt": {
    "Key": "A4FzK9x7B1vTcP3jXqL2NsW6eRaYtZrGmUxCvHdJqP1sTkZw",
    "Issuer": "https://smartmarket.local",
    "Audience": "https://smartmarket.local"
  }
}

```

Then:
```bash
dotnet restore
dotnet tool install --global dotnet-ef
dotnet ef database update
dotnet run
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Update base URL in `src/services/axios.ts` if needed:
```ts
baseURL: 'http://localhost:5276/api/v1',
```

Then:
```bash
npm run dev
```
Visit: `http://localhost:5173`

---

## 📡 API Overview

| Method | Endpoint                    | Description                                 | Access       |
|--------|-----------------------------|---------------------------------------------|--------------|
| POST   | `/auth/login`               | Authenticate and receive JWT token          | Public       |
| POST   | `/auth/register`            | Register a new user                         | Public       |
| GET    | `/users`                    | List all users                              | Admin        |
| GET    | `/users/{id}`               | Retrieve user by ID                         | Admin        |
| PUT    | `/users/{id}`               | Update user data                            | Admin        |
| DELETE | `/users/{id}`               | Delete user                                 | Admin        |
| GET    | `/jobs`                     | List all job postings                       | Authenticated|
| GET    | `/jobs/{id}`                | Get job by ID                               | Authenticated|
| POST   | `/jobs`                     | Create new job (detailed)                   | Authenticated|
| POST   | `/jobs/create-from-prompt`  | AI-powered job creation                     | Authenticated|
| DELETE | `/jobs/{id}`                | Delete job                                  | Admin        |

---

## 👥 Authors

- **Mouaad ELHANSALI**
- **Mohamed BARBYCH**
