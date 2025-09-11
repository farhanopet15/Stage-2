// src/components/shared/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">MyStore</Link>
            <div>
                {user ? (
                    <>
                        {user.role === 'admin' && (
                             <Link to="/admin" className="mr-4 hover:text-gray-300">Admin</Link>
                        )}
                        <span className="mr-4">Welcome, {user.username}</span>
                        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="hover:text-gray-300">Login</Link>
                )}
            </div>
        </nav>
    );
};