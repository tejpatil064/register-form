import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import { LoginForm } from "./components/LoginForm";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 align-middle">
        Welcome to Our Website
      </h1>
      <Routes>
        <Route path="/" element={<RegistrationForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
