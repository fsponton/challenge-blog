import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../index.css';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

const Register = () => {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });

    const isFormInvalid = () => {
        return (
            Object.values(errors).some(error => error !== '') ||
            Object.values(userData).some(value => value === '')
        );
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));

        validateForm({ name, value, setErrors })
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await apiService('/auth/register', userData, 'POST', null);
            if (response.data) {
                navigate("/login")
            }

        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-6">Blog Universal</h2>
                <h2 className="text-3xl font-bold text-center mb-6">Registración</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-medium">Nombre:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={userData.name}
                            onChange={handleChange}
                            required
                            className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium">Correo Electrónico:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                            className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium">Contraseña:</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                            className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={isFormInvalid()}
                        className={`w-full py-2 rounded-md transition duration-300 ${isFormInvalid()
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                    >
                        Registrar
                    </button>
                </form>
                <div className="link-register mt-4 text-center">
                    <Link to="/login" className="text-blue-400 hover:text-blue-500">Ir a iniciar sesión</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;

const validateName = (name: string) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (name.length < 3) {
        return 'El nombre debe tener al menos 3 caracteres';
    }
    return regex.test(name) ? '' : 'El nombre solo puede contener letras y espacios';
};

const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email) ? '' : 'El correo electrónico no tiene un formato válido';
};

const validatePassword = (password: string) => {
    return password.length >= 6 ? '' : 'La contraseña debe tener al menos 6 caracteres';
};

const validateForm = ({ name, value, setErrors }: { name: string; value: string; setErrors: React.Dispatch<React.SetStateAction<any>> }) => {
    let errorMessage = '';

    switch (name) {
        case 'name':
            errorMessage = validateName(value);
            break;
        case 'email':
            errorMessage = validateEmail(value);
            break;
        case 'password':
            errorMessage = validatePassword(value);
            break;
        default:
            break;
    }


    setErrors((prevState: any) => ({
        ...prevState,
        [name]: errorMessage,
    }));
};