import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="mb-4">You are logged in as: {user?.email}</p>
    </div>
  );
} 