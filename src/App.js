import React from 'react';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to Our Website</h1>
      <RegistrationForm />
    </div>
  );
}

export default App;

