// src/components/RegisterForm.jsx
import React, { useEffect } from 'react';
import { AuthCard, InputField } from './AuthDesign';
import { useFormLogic } from './UseFormLogic';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/authSlice";

const validateRegister = (values) => {
  const errors = {};

  if (!values.firstName) errors.firstName = 'First name is required.';
  if (!values.email) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email format.';
  }
  if (!values.password || values.password.length < 6)
    errors.password = 'Password must be at least 6 characters.';
  if (values.password !== values.repeatPassword)
    errors.repeatPassword = 'Passwords do not match.';
  if (!values.terms) errors.terms = 'You must agree to the terms.';

  return errors;
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.auth);

  const initialValues = {
    firstName: '', lastName: '', email: '', password: '', repeatPassword: '', terms: false,
  };

  const { values, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setErrors } =
    useFormLogic(initialValues, validateRegister);

  const handleRegister = () => {
    dispatch(registerUser({
      email: values.email,
      password: values.password,
      full_name: `${values.firstName} ${values.lastName}`.trim()
    }))
      .unwrap()
      .then(() => {
        alert("Account created! Please check your email to verify your account.");
        navigate("/login");
      })
      .catch(errMessage => setErrors({ general: errMessage }));
  };

  // Optional: redirect if already registered/logged in
  useEffect(() => {
    if (message) console.log("Message:", message);
  }, [message]);

  return (
    <AuthCard
      title="Create a new account"
      footerLink={
        <span>
          Already have an account?{" "}
          <Link to="/login" className='text-primary fw-medium text-decoration-none'>
            Sign in
          </Link>
        </span>
      }
    >
      <form onSubmit={e => { e.preventDefault(); handleSubmit(handleRegister); }}>

        <div className="row">
          <div className="col-md-6">
            <InputField
              label="First name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Abonggwa"
              error={errors.firstName}
            />
          </div>
          <div className="col-md-6">
            <InputField
              label="Last name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Benedict"
            />
          </div>
        </div>

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
          placeholder="Enter strong password"
          error={errors.password}
        />

        <InputField
          label="Repeat password"
          isPassword
          name="repeatPassword"
          value={values.repeatPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Repeat password"
          error={errors.repeatPassword}
        />

        <div className="form-check my-3">
          <input
            className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
            type="checkbox"
            id="termsCheck"
            name="terms"
            checked={values.terms}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label className="form-check-label small" htmlFor="termsCheck">
            I agree with the <a href="#">Terms and Privacy Policy</a>.
          </label>
          {errors.terms && <div className="invalid-feedback small d-block">{errors.terms}</div>}
        </div>

        {(errors.general || error) && (
          <div className="alert alert-danger small">
            {errors.general || error?.toString()}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100 mt-3 fw-bold"
          disabled={loading || isSubmitting}
          style={{ height: '48px' }}
        >
          {loading ? <span className="spinner-border spinner-border-sm me-2" role="status"></span> : null}
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </AuthCard>
  );
};

export default RegisterForm;
