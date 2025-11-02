// src/components/ResetPasswordForm.jsx
import React, { useState } from 'react';
import { AuthCard, InputField } from './AuthDesign';
import { useFormLogic } from './UseFormLogic';
import { Link } from 'react-router-dom';

const validateReset = (values) => {
    const errors = {};
    if (values.newPassword.length < 6) errors.newPassword = 'New password must be at least 6 characters.';
    if (values.newPassword !== values.confirmNewPassword) errors.confirmNewPassword = 'Passwords do not match.';
    return errors;
};

// Note: This component assumes a valid token/key is available to proceed with the reset.
const ResetPasswordForm = ({ onSwitch }) => {
    const initialValues = { newPassword: '', confirmNewPassword: '' };
    
    const { values, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormLogic(initialValues, validateReset);
    const [message, setMessage] = useState('');

    const resetPassword = async () => {
        // --- Mock API Call (includes token from URL in real scenario) ---
        console.log('Resetting password...');
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        setMessage('Your password has been successfully reset! Redirecting...');
        setTimeout(() => onSwitch('login'), 2000); 
    };

    return (
        <AuthCard
            title="Reset Password"
            footerLink={
                <span><Link 
                to="/login"
                className='text-primary fw-medium text-decoration-none'>Back to Sign in</Link></span>
            }
        >
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(resetPassword); }}>
                <InputField 
                    label="New Password" 
                    name="newPassword" 
                    value={values.newPassword} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="Enter new password" 
                    isPassword 
                    error={errors.newPassword}
                />
                <InputField 
                    label="Confirm New Password" 
                    name="confirmNewPassword" 
                    value={values.confirmNewPassword} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="Confirm new password" 
                    isPassword 
                    error={errors.confirmNewPassword}
                />

                {message && <div className="alert alert-success small my-3">{message}</div>}

                <button 
                    type="submit" 
                    className="btn btn-primary w-100 mt-3 fw-bold" 
                    disabled={isSubmitting}
                    style={{ height: '48px' }}
                >
                    {isSubmitting ? <span className="spinner-border spinner-border-sm me-2" role="status"></span> : null}
                    {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </AuthCard>
    );
};

export default ResetPasswordForm;