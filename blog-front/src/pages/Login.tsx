import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../index.css'
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { email, password };
        try {
            const response = await apiService('/auth/login', data, 'POST', null);
            login(response.token);
            navigate('/posts');
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-6">Blog Universal</h2>
                <h2 className="text-3xl font-bold text-center mb-6">Login </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium">Email:</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium">Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">Login</button>
                </form>
                <div className="link-register mt-4 text-center">
                    <Link to="/register" className="text-blue-400 hover:text-blue-500">Ir a registrarse</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;