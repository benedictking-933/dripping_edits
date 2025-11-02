// src/components/Login.jsx
import React, { useEffect } from 'react';
import { AuthCard, InputField } from './AuthDesign';
import { useFormLogic } from './UseFormLogic';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";

const validateLogin = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email format.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  }

  return errors;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get state from Redux
  const { user, loading, error } = useSelector((state) => state.auth);

  const initialValues = { email: '', password: '' };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors
  } = useFormLogic(initialValues, validateLogin);

  const handleLogin = () => {
    dispatch(loginUser({ email: values.email, password: values.password }))
      .unwrap()
      .then(() => navigate("/shop"))
      .catch((errMessage) => {
        setErrors({ general: errMessage });
      });
  };

  // If user already logged in, redirect automatically
  useEffect(() => {
    if (user) navigate("/shop");
  }, [user, navigate]);

  return (
    <AuthCard
      title="Welcome back"
      footerLink={
        <span>
          Don't have an account?{" "}
          <Link to="/register" className='text-primary fw-medium text-decoration-none'>
            Sign up
          </Link>
        </span>
      }
    >
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(handleLogin); }}>

        <InputField
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="johndoe@example.ext"
          error={errors.email}
        />

        <InputField
          label="Password"
          isPassword
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your password"
          error={errors.password}
        />

        <div className="text-end mb-2">
          <Link to="/forgot-password" className='small text-decoration-none text-primary'>
            Forgot password?
          </Link>
        </div>

        {(errors.general || error) && (
          <div className="alert alert-danger small">
            {errors.general || error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100 mt-3 fw-bold"
          disabled={loading || isSubmitting}
          style={{ height: '48px' }}
        >
          {loading ? <span className="spinner-border spinner-border-sm me-2" role="status"></span> : null}
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </AuthCard>
  );
};

export default Login;
