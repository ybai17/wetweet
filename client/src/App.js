// src/App.js
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ItemList from './components/ItemList';
import NewPostPage from './pages/NewPostPage';
import MyProfilePage from './pages/MyProfilePage';
import UserProfilePage from './pages/UserProfilePage';

import RequireAuth from './security/RequireAuth';
import Navbar from './components/Navbar';
import Leftbar from './components/Leftbar';

const ProtectedLayout = () => (
  <>
    <Navbar />
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
      <Leftbar />
      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  </>
);

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

      {/* Protected (navbar + sidebar) */}
      <Route element={<RequireAuth><ProtectedLayout /></RequireAuth>}>
        <Route path="/itemlist" element={<ItemList />} />
        <Route path="/newpost" element={<NewPostPage />} />
        <Route path="/myprofile" element={<MyProfilePage />} />
        <Route path="/userprofile/:id" element={<UserProfilePage />} />
      </Route>

      {/* Catch‑all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
