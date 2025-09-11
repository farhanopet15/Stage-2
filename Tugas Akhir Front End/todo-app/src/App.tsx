import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../src/components/Shared/Navbar';
import { ProtectedRoute } from '../src/components/Shared/ProtectedRoute';
import { StorePage } from './pages/StorePage';
import { LoginPage } from './pages/LoginPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { RegisterPage } from './pages/RegisterPage';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<StorePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App