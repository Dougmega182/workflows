import SignInForm from "../components/SignInForm.jsx";
import SignOutForm from "../components/SignOutForm.jsx";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to Transform Homes QR Sign-In System</h1>
      <SignInForm />
      <SignOutForm />
    </div>
  );
}
