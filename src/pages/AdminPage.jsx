import { useState } from 'react';
import { useNames } from '../context/NamesContext';
import { Link } from 'react-router-dom';

export default function AdminPage() {
  const { names, clearNames } = useNames();
  const [winner, setWinner] = useState(null); // { index, name }
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDraw = () => {
    if (names.length === 0) return;
    setWinner(null);
    setIsDrawing(true);

    // Brief suspense delay before reveal
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setWinner({ index: randomIndex, name: names[randomIndex] });
      setIsDrawing(false);
    }, 600);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all registered names? This cannot be undone.')) {
      clearNames();
      setWinner(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* Page header */}
      <div className="bg-[#0F1F3D] text-white py-10 px-6 dot-grid-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1F3D]/80" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-[#00BFA6]/20 text-[#00BFA6] text-xs font-semibold tracking-widest uppercase mb-3">
            Facilitator View
          </span>
          <h1 className="text-2xl font-extrabold">Random Draw</h1>
          <p className="text-slate-400 text-sm mt-1">
            {names.length === 0
              ? 'Waiting for participants to register.'
              : `${names.length} participant${names.length !== 1 ? 's' : ''} in the pool — ready to draw.`}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Winner reveal card */}
        {(winner || isDrawing) && (
          <div className={`${winner ? 'animate-scale-in' : ''}`}>
            <div className="bg-[#0F1F3D] rounded-2xl p-8 text-white text-center relative overflow-hidden shadow-xl shadow-slate-900/20">
              {/* Decorative glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#00BFA6]/10 rounded-full blur-3xl pointer-events-none" />

              {isDrawing ? (
                <div className="relative z-10 py-4">
                  <div className="w-12 h-12 rounded-full border-4 border-[#00BFA6]/30 border-t-[#00BFA6] animate-spin mx-auto mb-4" />
                  <p className="text-slate-400 text-sm font-medium">Selecting a winner…</p>
                </div>
              ) : winner && (
                <div className="relative z-10">
                  <p className="text-[#00BFA6] text-xs font-bold tracking-widest uppercase mb-5">🎉 Selected Participant</p>
                  <div className="flex items-center justify-center gap-5">
                    <div className="animate-pulse-ring w-20 h-20 rounded-2xl bg-[#00BFA6] flex flex-col items-center justify-center shrink-0 shadow-lg shadow-[#00BFA6]/40">
                      <span className="text-xs text-white/70 font-medium leading-none mb-0.5">No.</span>
                      <span className="text-3xl font-extrabold text-white leading-none">{winner.index + 1}</span>
                    </div>
                    <div className="text-left">
                      <p className="text-3xl font-extrabold leading-tight">{winner.name}</p>
                      <p className="text-slate-400 text-sm mt-1">Entry #{winner.index + 1} of {names.length}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDraw}
            disabled={names.length === 0 || isDrawing}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all duration-150 shadow-sm ${
              names.length === 0 || isDrawing
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#00BFA6] hover:bg-[#009E89] active:scale-[0.98] text-white shadow-[#00BFA6]/25'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
            </svg>
            {isDrawing ? 'Drawing…' : winner ? 'Draw Again' : 'Pick a Random Name'}
          </button>

          {names.length > 0 && (
            <button
              onClick={handleClear}
              className="sm:w-auto px-5 py-4 rounded-xl border border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50 text-sm font-medium transition-all duration-150 flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Clear All
            </button>
          )}
        </div>

        {/* Participants list */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-[#0F1F3D] text-sm">Registered Participants</h2>
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
              {names.length} total
            </span>
          </div>

          {names.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-500">No one registered yet</p>
              <p className="text-xs text-slate-400 mt-1 mb-4">Participants can register on the main page.</p>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00BFA6] hover:text-[#009E89] transition-colors"
              >
                Go to registration
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 3 5 5-5 5" />
                </svg>
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-slate-50">
              {names.map((name, index) => {
                const isWinner = winner && winner.index === index;
                return (
                  <li
                    key={index}
                    className={`flex items-center gap-4 px-6 py-3.5 transition-colors duration-300 ${
                      isWinner ? 'bg-[#E6FAF8]' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300 ${
                        isWinner
                          ? 'bg-[#00BFA6] text-white shadow-sm shadow-[#00BFA6]/30'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className={`text-sm font-medium transition-colors duration-300 ${isWinner ? 'text-[#009E89]' : 'text-[#0F1F3D]'}`}>
                      {name}
                    </span>
                    {isWinner && (
                      <span className="ml-auto text-xs font-semibold text-[#00BFA6] flex items-center gap-1 animate-fade-in">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M7.5 1a.75.75 0 0 1 .67.416l1.467 2.973 3.283.477a.75.75 0 0 1 .416 1.279l-2.375 2.315.561 3.268a.75.75 0 0 1-1.088.791L7.5 10.928l-2.934 1.541a.75.75 0 0 1-1.088-.79l.56-3.27L1.663 6.145a.75.75 0 0 1 .416-1.279l3.283-.477L6.83 1.416A.75.75 0 0 1 7.5 1Z" />
                        </svg>
                        The Chosen One
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
