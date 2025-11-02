import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve amount and phone number from navigation state
  const { amount, phoneNumber } = location.state || {};

  // Generate order number and date
  const orderDetails = {
    id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString(),
    amount: amount?.toFixed(2) || '0.00'
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
      <div className="card shadow-lg p-4 p-md-5 text-center" style={{ maxWidth: '500px', width: '100%', borderRadius: '1rem' }}>
        <div className="card-body">
          
          {/* Success Icon */}
          <div className="mb-4">
            <div style={{ 
              width: '80px', height: '80px', margin: '0 auto', 
              borderRadius: '50%', background: '#d1e7dd', 
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#198754" className="bi bi-check-lg" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
              </svg>
            </div>
          </div>

          <h2 className="fw-bolder mb-3 text-dark">Payment Successful!</h2>
          <p className="text-muted lead mb-4">
            Thank you for your trust. Your payment request will be sent to your number shortly.
          </p>

          {/* Order Details */}
          <div className="bg-light p-3 rounded-3 mb-4 text-start">
            <ul className="list-unstyled mb-0">
              <li className="d-flex justify-content-between mb-2">
                <span className="text-muted">Order Number:</span>
                <span className="fw-bold">{orderDetails.id}</span>
              </li>
              <li className="d-flex justify-content-between mb-2">
                <span className="text-muted">Date:</span>
                <span className="fw-medium">{orderDetails.date}</span>
              </li>
              <li className="d-flex justify-content-between mb-2">
                <span className="text-muted">Mobile Money Number:</span>
                <span className="fw-medium">{phoneNumber || 'N/A'}</span>
              </li>
              <li className="border-top my-2 pt-2 d-flex justify-content-between">
                <span className="fw-bold">Total Amount:</span>
                <span className="fw-bolder text-primary fs-5">{orderDetails.amount} FCFA</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="d-grid gap-2">
            <button 
              onClick={() => navigate('/')} 
              className="btn btn-primary fw-bold" 
              style={{ height: '48px' }}
            >
              Continue Shopping
            </button>
            <button 
              onClick={() => alert('Download Invoice PDF...')} 
              className="btn btn-outline-secondary fw-medium" 
              style={{ height: '48px' }}
            >
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
