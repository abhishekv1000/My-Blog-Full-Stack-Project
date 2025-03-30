import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/Endpoint';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue({ ...value, image: file });
  };

  const handleImageClick = () => {
    document.getElementById('image').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('FullName', value.fullName);
    formData.append('email', value.email);
    formData.append('password', value.password);
    formData.append('profile', value.image);

    try {
      const response = await post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <section className="bg-gradient">
      <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
        <div className="card shadow-lg rounded-4 p-4" style={{ maxWidth: '400px' }}>
          <div className="text-center mb-3">
            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="Logo" width="50" />
            <h2 className="mt-2 fw-bold text-dark">Create Your Account</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <label htmlFor="image" className="form-label">Profile Picture</label>
              <div className="position-relative">
                <img
                  src={
                    value.image
                      ? URL.createObjectURL(value.image)
                      : 'https://www.w3schools.com/howto/img_avatar.png' // Default Avatar
                  }
                  alt="avatar"
                  className="rounded-circle border border-2 border-primary shadow-sm"
                  width="100"
                  height="100"
                  style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
                  onClick={handleImageClick}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <input
                  type="file"
                  id="image"
                  className="d-none"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="Full Name"
                required
                value={value.fullName}
                onChange={(e) => setValue({ ...value, fullName: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control shadow-sm"
                placeholder="Email"
                required
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control shadow-sm"
                placeholder="Password"
                required
                value={value.password}
                onChange={(e) => setValue({ ...value, password: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 shadow-lg">Sign Up</button>
          </form>

          <p className="mt-3 text-center text-muted">
            Already have an account? <Link to="/login" className="text-primary fw-bold">Log In</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
