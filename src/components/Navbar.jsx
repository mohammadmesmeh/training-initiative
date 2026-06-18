import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-[#0F1F3D] shadow-lg">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00BFA6] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.63 48.63 0 0 1 12 20.904a48.63 48.63 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
            </svg>
          </div>
          <span className="text-white font-semibold text-base tracking-wide">Training Initiative</span>
        </div>

        <div className="flex flex-1 items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === '/'
                  ? 'bg-[#00BFA6] text-white'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Register
            </Link>
            <Link
              to="/admin"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === '/admin'
                  ? 'bg-[#00BFA6] text-white'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Admin Draw
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  {isAdmin ? 'Admin' : 'User'}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="px-3 py-2 rounded-lg bg-white text-[#0F1F3D] text-xs font-semibold transition hover:bg-slate-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-lg bg-white text-[#0F1F3D] text-xs font-semibold transition hover:bg-slate-100"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
