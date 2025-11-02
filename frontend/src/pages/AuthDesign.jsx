// src/components/AuthDesign.jsx
import React, { useState } from 'react';

/**
 * Reusable Input Field with Password Toggle and Phone Prefix.
 */
export const InputField = ({ label, type = 'text', name, value, onChange, onBlur, placeholder, isPassword = false, phonePrefix = false, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const inputClasses = `form-control ${error ? 'is-invalid' : ''}`;

    return (
        <div className="mb-3">
            {label && <label htmlFor={name} className="form-label fw-medium">{label}</label>}
            <div className="input-group">
                {phonePrefix && (
                    <span className="input-group-text bg-light text-muted border-end-0 border-subtle" style={{ minWidth: '60px' }}>
                        +1
                    </span>
                )}
                <input
                    type={inputType}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={inputClasses}
                    style={{ height: '48px', borderRadius: phonePrefix ? '0 0.25rem 0.25rem 0' : '0.25rem' }}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="btn btn-outline-secondary border-start-0 text-muted bg-white"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ boxShadow: 'none' }}
                        tabIndex={-1} 
                    >
                        <span style={{ fontSize: '0.85rem', width: '30px' }}>{showPassword ? 'HIDE' : 'SHOW'}</span> 
                    </button>
                )}
            </div>
            {error && <div className="invalid-feedback small d-block">{error}</div>}
        </div>
    );
};

/**
 * The core design template wrapper (Card).
 */
export const AuthCard = ({ title, children, footerLink }) => (
    <div className="container-fluid bg-light" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
        <div className="card shadow-lg p-4 p-md-5" style={{ maxWidth: '480px', width: '100%', borderRadius: '1rem' }}>
            <div className="card-body p-0">
                <h2 className="card-title text-center mb-5 fw-bolder text-dark">{title}</h2>
                {children}
            </div>
            {footerLink && (
                <div className="card-footer text-center bg-white border-0 pt-4">
                    <p className="mb-0 text-muted small">{footerLink}</p>
                </div>
            )}
        </div>
    </div>
);