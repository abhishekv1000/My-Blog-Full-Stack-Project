import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/Endpoint';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/AuthSlice';
import toast from 'react-hot-toast';
// import './Login.css'; // Assuming external CSS for better styling

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const request = await post('/auth/login', value);
            const response = request.data;
            if (request.status === 200) {
                dispatch(setUser(response.user));
                navigate('/');
                toast.success(response.message);
            }
        } catch (error) {
            console.error("login error", error);
            toast.error(error.response?.data?.message || "An unexpected error occurred.");
        }
    };

    return (
        <section className="bg-gradient">
            <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
                <div className="card shadow-lg rounded-4 p-5" style={{ maxWidth: '400px' }}>
                    <div className="text-center mb-5">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="Logo" width="50" />
                        <h2 className="mt-2 fw-bold text-dark">Welcome Back!</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                className="form-control large-input shadow-sm"
                                placeholder="Your email"
                                required
                                value={value.email}
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                className="form-control large-input shadow-sm"
                                placeholder="Password"
                                required
                                value={value.password}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100 shadow-lg">Sign In</button>
                    </form>

                    <p className="mt-3 text-center text-muted">
                        Don’t have an account? <Link to="/register" className="text-primary fw-bold">Sign Up</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
