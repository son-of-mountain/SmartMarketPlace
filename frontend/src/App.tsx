// src/App.tsx
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import JobListingsPage from "./pages/JobListingsPage";
import PromptPage from "./pages/PromptPage";
import JobForm from "./components/JobForm";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";
import EditUserPage from "./pages/EditUserPage";
import RegisterPage from "./pages/RegisterPage";

// FIX: Change 'children: JSX.Element' to 'children: React.ReactNode'
const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const isAuthenticated = !!token;
  const isAdmin = user ? JSON.parse(user).role === 0 : false;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    alert("Access Denied: You do not have administrative privileges.");
    return <Navigate to="/jobs" replace />; 
  }

  return <>{children}</>; // Wrap children in a fragment just to be explicit, though usually not strictly necessary for a single child
};

// Wrapper component to access location state for JobForm (for initialData)
const JobFormWrapper: React.FC = () => {
  const location = useLocation();
  const initialJobData = location.state?.initialJobData; 
  return <JobForm initialData={initialJobData} />;
};


export default function App (){
    const location = useLocation();
    // Do not show Navbar on login or register pages
    const showNavbar = !['/login', '/register'].includes(location.pathname);

    return(
     <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/jobs" replace />} /> 
        
        {/* Protected Routes */}
        <Route path="/jobs" element={<ProtectedRoute><JobListingsPage /></ProtectedRoute>} />
        <Route path="/prompt-job" element={<ProtectedRoute><PromptPage /></ProtectedRoute>} />
        <Route path="/create-job" element={<ProtectedRoute><JobFormWrapper /></ProtectedRoute>} />
        
        {/* Admin-only Routes */}
        <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminPage /></ProtectedRoute>} />
        <Route path="/edit-user/:id" element={<ProtectedRoute adminOnly={true}><EditUserPage /></ProtectedRoute>} />
        
        {/* Fallback */}
        <Route path="*" element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />
      </Routes>
    </>
);   
}