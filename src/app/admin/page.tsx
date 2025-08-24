'use client';

import React, { useState, useEffect } from 'react';

import { useAuth } from '@/context/AuthContext';
import AdminLogin from '@/components/Admin/AdminLogin';
import AdminDashboard from '@/components/Admin/AdminDashboard';

export default function AdminPage() {
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-900">
      {isAuthenticated ? <AdminDashboard /> : <AdminLogin />}
    </div>
  );
}