import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NamesProvider } from './context/NamesContext';
import Navbar from './components/Navbar';
import InputPage from './pages/InputPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <NamesProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<InputPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </NamesProvider>
  );
}
