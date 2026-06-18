import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Unable to sign in. Check your email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-900/10">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Sign in</h1>
        <p className="text-sm text-slate-500 mb-6">Use your email and password to access the admin area.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00BFA6] focus:ring-2 focus:ring-[#00BFA6]/20"
              required
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00BFA6] focus:ring-2 focus:ring-[#00BFA6]/20"
              required
            />
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#00BFA6] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#009E89]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
