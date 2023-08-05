import React, { useState, useEffect } from 'react';
import './payment.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookTitle = queryParams.get('title') || '';

  const [noOfCopies, setNoOfCopies] = useState('');
  const [upiId, setUpiId] = useState('');

  const handlePayNow = () => {
    if (noOfCopies && upiId) {
      // Show pop-up box with the message
      window.alert('Your book has been successfully Ordered.');

      // Navigate to the home page ("/")
      navigate('/');
    } else {
      window.alert('Please fill in all the required fields.');
    }
  };

  return (
    <div className='payment'>
      <h1>Payment Page</h1><br/>
      <form>
        <input
          type='text'
          placeholder='Book Title'
          value={bookTitle}
          readOnly
        />
        <input
          type='text'
          placeholder='No of copies'
          value={noOfCopies}
          onChange={(e) => setNoOfCopies(e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='UPI ID'
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          required
        /><br />
        <button type='button' onClick={handlePayNow}>Pay Now</button>
      </form>
    </div>
  );
}

export default Payment;
