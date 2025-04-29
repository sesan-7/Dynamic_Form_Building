import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import DynamicForm from "./components/DynamicForm";
import { User } from "./types/form";

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">Dynamic Form Application</h1>
          <p className="text-gray-600">Complete your registration by filling out the required forms</p>
        </div>

        {!user ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div className="animate-fadeIn">
            <div className="bg-indigo-100 border-l-4 border-indigo-500 p-4 mb-6 rounded">
              <p className="text-indigo-700">
                <span className="font-medium">Logged in as:</span> {user.name} (Roll Number: {user.rollNumber})
              </p>
            </div>
            <DynamicForm rollNumber={user.rollNumber} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;