import React from "react";

export default function Success() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-600">Sign-Out Successful!</h2>
        <p className="mt-2 text-gray-600">Thank you for signing out. Have a great day!</p>
      </div>
    </div>
  );
}
