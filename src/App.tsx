import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Partners from './pages/Partners';
import WinYourCard from './pages/WinYourCard';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import { useAuthStore } from './lib/store';
import { supabase } from './lib/supabaseClient';

function App() {
  const { setUser, loadProfile } = useAuthStore();

  useEffect(() => {
    // Initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile();
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, loadProfile]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/win-your-card" element={<WinYourCard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;