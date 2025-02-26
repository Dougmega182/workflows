export default function SuccessMessage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
          <h2 className="text-2xl font-bold text-green-600">You have successfully signed in!</h2>
          <p className="text-gray-700 mt-2">Scan the QR code again when leaving to sign out.</p>
        </div>
      </div>
    );
  }
  