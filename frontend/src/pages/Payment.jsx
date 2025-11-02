import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard, InputField } from './AuthDesign';
import { useFormLogic } from './UseFormLogic';

const validatePayment = (values) => {
  const errors = {};
  if (!values.phoneNumber || !/^\d{8,15}$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'Enter a valid Mobile Money number.';
  }
  return errors;
};

const PaymentForm = () => {
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);

  // Read total from localStorage cart
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    setTotalAmount(total);
  }, []);

  const initialValues = {
    phoneNumber: '',
  };

  const { values, errors, isSubmitting, handleChange, handleBlur, handleSubmit } =
    useFormLogic(initialValues, validatePayment);

  const processPayment = () => {
    // Instead of calling backend, redirect to success page with state
    navigate('/payment-success', {
      state: { 
        phoneNumber: values.phoneNumber, 
        amount: totalAmount 
      }
    });
  };

  return (
    <AuthCard title="Mobile Money Payment">
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(processPayment); }}>
        <InputField
          label="Mobile Money Number"
          type="tel"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="67XXXXXXX"
          error={errors.phoneNumber}
        />

        <button
          type="submit"
          className="btn btn-primary w-100 fw-bold"
          style={{ height: '48px' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : `Pay ${totalAmount.toFixed(2)} XAF`}
        </button>
      </form>
    </AuthCard>
  );
};

export default PaymentForm;
