
# Smart Marketplace

Smart Marketplace is a full-stack job portal application designed to connect clients with freelancers. It features an intelligent job creation system powered by Groq's API , allowing users to generate detailed job postings from simple prompts. The application is built with a modern tech stack, featuring an ASP.NET Core 8 backend and a React (Vite + TypeScript) frontend.

## Project Demo

A complete walkthrough of the application's features, including user authentication, job creation (manual and AI-powered), and admin controls.

https://github.com/user-attachments/assets/95ed109c-d035-46e3-a7d5-2a2b37c0414e

## Features

- **User Authentication**: Secure login and registration system with JWT (JSON Web Tokens).
- **Role-Based Access Control**: Differentiated access for regular users and administrators.
- **AI-Powered Job Creation**: Users can enter a simple text prompt (e.g., "build a coffee shop website") to automatically generate a detailed job posting using the Groq API.
- **Job Management**: Create, view, publish, and delete job listings.
- **Admin Dashboard**: A dedicated dashboard for administrators to manage both users and jobs (edit, delete).
- **RESTful API**: A well-structured backend API for all frontend interactions.

## Architecture

The project is structured as a monorepo with two main components:
- **`SmartMarketplace`**: The ASP.NET Core 8 backend API.
- **`frontend`**: The React (Vite + TypeScript) frontend application.

## Tech Stack

#### Backend (SmartMarketplace)
- **Framework**: ASP.NET Core 8
- **Language**: C# 12
- **Database**: MySQL (via Pomelo.EntityFrameworkCore.MySql)
- **Authentication**: JWT Bearer Tokens
- **Password Hashing**: BCrypt.Net
- **AI Integration**: Groq API

#### Frontend
- **Framework/Library**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Bootstrap 5
- **Routing**: React Router
- **API Communication**: Axios

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **[.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)**
- **[Node.js](https://nodejs.org/)** (v18 or later recommended)
- **[MySQL Server](https://dev.mysql.com/downloads/mysql/)** (or another compatible database server like MariaDB)
- A code editor like [VS Code](https://code.visualstudio.com/) or [Rider](https://www.jetbrains.com/rider/).

## Setup and Installation

Follow these steps to get the project running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/khalilh2002/Smart_marketplace.git
cd Smart_marketplace
```

### 2. Backend Setup (SmartMarketplace)

#### a. Configure Application Settings
Navigate to the backend directory and open `SmartMarketplace/appsettings.json`. You need to update the following sections:

```json
{
  // ...
  "ConnectionStrings": {
    "Default": "Server=localhost;User=your_db_user;Password=your_db_password;Database=smart_marketplace_db"
  },
  "Groq": {
    "ApiKey": "YOUR_GROQ_API_KEY", // Get this from https://console.groq.com/keys
    "BaseUrl": "https://api.groq.com/openai/v1/chat/completions"
  },
  "Jwt": {
    "Key": "your_super_secret_and_long_key_for_jwt_256_bits_or_more", // Replace with a strong secret key
    "Issuer": "https://your-domain.com",
    "Audience": "https://your-domain.com"
  }
}
```
- **ConnectionStrings**: Update with your MySQL credentials.
- **Groq.ApiKey**: Obtain a free API key from the [GroqCloud Console](https://console.groq.com/keys).
- **Jwt.Key**: Replace the placeholder with a long, secure, and randomly generated string.

#### b. Setup the Database
Ensure your MySQL server is running. The application uses Entity Framework Core migrations to manage the database schema.

From the `SmartMarketplace` directory, run the following commands:
```bash
# Install the EF Core tools if you haven't already
dotnet tool install --global dotnet-ef

# Restore dependencies
dotnet restore

# Apply migrations to create the database and tables
dotnet ef database update
```
If you encounter issues, you may need to add a migration first:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

#### c. Run the Backend
You can now run the backend server. It will typically start on `http://localhost:5276`.

```bash
# From the SmartMarketplace directory
dotnet run
```

### 3. Frontend Setup

#### a. Navigate to Frontend Directory
Open a new terminal window and navigate to the `frontend` directory.

```bash
cd frontend
```

#### b. Install Dependencies
Install all the required npm packages.

```bash
npm install
```

#### c. Configure API Base URL
The frontend is pre-configured in `src/services/axios.ts` to connect to the backend at `http://localhost:5276`. If your backend runs on a different port, update this line:

**File:** `frontend/src/services/axios.ts`
```typescript
const api = axios.create({
  baseURL: 'http://localhost:5276/api/v1', // <-- Update this if necessary
  // ...
});
```

#### d. Run the Frontend
Start the Vite development server. It will typically start on `http://localhost:5173`.

```bash
npm run dev
```

You can now open your browser and navigate to `http://localhost:5173` to use the application.

## API Endpoints

The backend exposes the following RESTful endpoints under the base path `/api/v1`.

| Method | Endpoint                    | Description                                       | Access       |
|--------|-----------------------------|---------------------------------------------------|--------------|
| `POST` | `/auth/login`               | Authenticate a user and get a JWT token.          | Public       |
| `POST` | `/auth/register`            | Register a new user.                              | Public       |
| `GET`  | `/users`                    | Get a list of all users.                          | Admin        |
| `GET`  | `/users/{id}`               | Get a single user by ID.                          | Admin        |
| `PUT`  | `/users/{id}`               | Update a user's details.                          | Admin        |
| `DELETE`| `/users/{id}`               | Delete a user.                                    | Admin        |
| `GET`  | `/jobs`                     | Get a list of all job postings.                   | Authenticated|
| `GET`  | `/jobs/{id}`                | Get a single job posting by ID.                   | Authenticated|
| `POST` | `/jobs`                     | Create a new job posting from detailed data.      | Authenticated|
| `POST` | `/jobs/create-from-prompt`  | Generate job details from a simple text prompt.   | Authenticated|
| `DELETE`| `/jobs/{id}`                | Delete a job posting.                             | Admin        |

---

## Authors

This project was created by:
- **Mouaad ELHANSALI**
- **Mohamed BARBYCH**
