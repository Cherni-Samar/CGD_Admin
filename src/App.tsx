import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../src/features/auth/Login';
import Quotes from './features/quotes/pages/Quotes';
import AuthGuard from '../src/features/auth/AuthGuard';
import GalleryAdmin from './features/gallery/pages/GalleryAdmin'; // ⬅️ ajoute cet import
import { ThemeProvider } from './state/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protège la route /quotes */}
        <Route
          path="/quotes"
          element={
            <AuthGuard>
              <Quotes />
            </AuthGuard>
          }
        />

        {/* Ajoute la route protégée pour la galerie */}
        <Route
          path="/gallery"
          element={
            <AuthGuard>
              <GalleryAdmin />
            </AuthGuard>
          }
        />

        <Route path="*" element={<Navigate to="/quotes" />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;