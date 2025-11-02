// src/components/useFormLogic.js
import { useState } from 'react';

export const useFormLogic = (initialValues, validateCallback) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
        
        // Simple real-time validation on change 
        if (errors[name]) {
            const newErrors = validateCallback({ ...values, [name]: type === 'checkbox' ? checked : value });
            setErrors(prev => ({ ...prev, [name]: newErrors[name] || '' }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        const newErrors = validateCallback(values);
        setErrors(prev => ({ ...prev, [name]: newErrors[name] || '' }));
    };

    const handleSubmit = async (callback) => {
        const validationErrors = validateCallback(values);
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            try {
                await callback(); 
            } catch (error) {
                console.error("Submission failed:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setErrors
    };
};