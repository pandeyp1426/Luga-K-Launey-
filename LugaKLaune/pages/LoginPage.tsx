
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // In a real app, you'd also check the password. Here we just check email.
    const success = login(email);
    if (success) {
      navigate('/account');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-center text-3xl font-bold font-serif text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-center text-gray-600 mb-8">Sign in to your account</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password"  className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              >
                Sign in
              </button>
            </div>
            <p className="text-center text-sm text-gray-500">
              Hint: Use 'admin@chicthreads.com' or 'alice@example.com'. Any password will work.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

