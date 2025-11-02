// src/components/ForgotPasswordForm.jsx
import React, { useState } from 'react';
import { AuthCard, InputField } from './AuthDesign';
import { useFormLogic } from './UseFormLogic'; // ✅ added import
import { Link } from 'react-router-dom';

const validateForgot = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Invalid email format.';
    }
    return errors;
};

const ForgotPasswordForm = ({ onSwitch }) => {
    const { values, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setErrors } = useFormLogic({ email: '' }, validateForgot);
    const [message, setMessage] = useState('');

    const sendResetLink = async () => {
        setMessage('');
        setErrors({});
        console.log('Sending reset link to:', values.email);

        await new Promise(resolve => setTimeout(resolve, 2000)); 
        setMessage(`A password reset link has been sent to ${values.email}. Check your inbox!`);
    };

    return (
        <AuthCard
            title="Forgot Password"
            footerLink={
                <span>
                    Remembered your password?{' '}
                    <Link 
                    to= '/login'
                     onClick={() => onSwitch('login')} className='text-primary fw-medium text-decoration-none'>
                        Back to Sign in
                    </Link>
                </span>
            }
        >
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(sendResetLink); }}>
                <p className="text-muted small mb-4 text-center">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                <InputField 
                    label="Email" 
                    type="email" 
                    name="email" 
                    value={values.email} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="Enter your email" 
                    error={errors.email}
                />

                {message && <div className="alert alert-success small my-3">{message}</div>}

                <button 
                    type="submit" 
                    className="btn btn-primary w-100 mt-3 fw-bold"
                    disabled={isSubmitting || !values.email}
                    style={{ height: '48px' }}
                >
                    {isSubmitting && <span className="spinner-border spinner-border-sm me-2" role="status"></span>}
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
        </AuthCard>
    );
};

export default ForgotPasswordForm;
