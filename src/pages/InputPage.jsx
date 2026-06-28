import { useState, useRef } from 'react';
import { useNames } from '../context/NamesContext';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function InputPage() {
  const { names } = useNames();
  const [input, setInput] = useState('');
  const [confirmation, setConfirmation] = useState(null); // { name, timestamp }
  const [error, setError] = useState('');
  const inputRef = useRef(null);


const handleSubmit = async (e) => {
  e.preventDefault();

  const trimmed = input.trim();

  if (!trimmed) {
    setError("Please enter a name before submitting.");
    inputRef.current?.focus();
    return;
  }

  setError("");

  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: trimmed,
      isParticipated: false,
      createdAt: serverTimestamp(),
    });

    setConfirmation({
      name: trimmed,
      id: docRef.id,
    });

    setInput("");
    inputRef.current?.focus();

  } catch (error) {
    console.error("Firestore Error:", error);

    switch (error.code) {
      case "permission-denied":
        setError("You don't have permission to submit.");
        break;

      case "unavailable":
        setError("Service is temporarily unavailable. Please try again.");
        break;

      case "cancelled":
        setError("Request was cancelled.");
        break;

      default:
        setError("Something went wrong. Please try again.");
    }
  }
};

return (
  <div className="min-h-screen bg-[#F8F9FC] flex flex-col">
    {/* Hero section */}
    <div className="bg-[#0F1F3D] text-white pt-14 pb-16 px-6 text-center relative overflow-hidden">
      {/* Subtle decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-white/5" />
        <div className="absolute w-[320px] h-[320px] rounded-full border border-white/5" />
      </div>

      <div className="relative z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-[#00BFA6]/20 text-[#00BFA6] text-xs font-semibold tracking-widest uppercase mb-4">
          Participant Registration
        </span>
        <h1 className="text-3xl font-800 font-extrabold leading-tight mb-3">
          Join the Session
        </h1>
        <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
          Enter your name below to be included in today's training draw.
        </p>
      </div>
    </div>

    {/* Form card */}
    <div className="flex-1 flex flex-col items-center px-4 z-20 -mt-8 pb-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/80 p-8 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nameInput" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                id="nameInput"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(''); }}
                placeholder="e.g. Ahmed Al-Rashid"
                autoComplete="off"
                className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0F1F3D] placeholder-slate-300 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#00BFA6]/40 focus:border-[#00BFA6] ${error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                  }`}
              />
              {error && (
                <p className="mt-2 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-[#00BFA6] hover:bg-[#009E89] active:scale-[0.98] text-white font-semibold py-3 rounded-xl text-sm transition-all duration-150 shadow-sm shadow-[#00BFA6]/30"
            >
              Register Name
            </button>
          </form>

          {/* Confirmation message */}
          {confirmation && (
            <div key={confirmation.id} className="mt-5 animate-fade-in">
              <div className="flex items-start gap-3 bg-[#E6FAF8] border border-[#00BFA6]/25 rounded-xl px-4 py-3">
                <div className="w-5 h-5 rounded-full bg-[#00BFA6] flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#009E89]">Successfully registered!</p>
                  <p className="text-xs text-[#00BFA6] mt-0.5">
                    <span className="font-medium">{confirmation.name}</span> has been added to the draw.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Participant count hint */}
        <div className="mt-4 flex items-center justify-between px-1">
          <span className="text-xs text-slate-400">
            {names.length === 0
              ? 'No participants registered yet'
              : `${names.length} participant${names.length !== 1 ? 's' : ''} registered`}
          </span>
          {names.length > 0 && (
            <Link
              to="/admin"
              className="text-xs text-[#00BFA6] font-medium hover:text-[#009E89] flex items-center gap-1 transition-colors"
            >
              View list
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 3 5 5-5 5" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
);
}
