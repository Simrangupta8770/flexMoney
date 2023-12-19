import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const PaymentModal = ({ isOpen, onClose, onConfirmPayment }) => {
  const [processingPayment, setProcessingPayment] = useState(false);

  const handleConfirmPayment = async () => {
    // Simulate payment processing
    setProcessingPayment(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a delay

    // Once payment is processed, you can handle the result
    // For simplicity, let's assume the payment is successful
    setProcessingPayment(false);
    onConfirmPayment(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: '300px', // Adjust the width as needed
          height: '200px', // Adjust the height as needed
          margin: 'auto', // Center the modal
          padding: '20px',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darken the background
        },
    }}
      contentLabel="Payment Confirmation"
    >
      <h2>Payment Confirmation</h2>
      <p>Are you sure you want to proceed with the payment?</p>

      <button onClick={handleConfirmPayment} disabled={processingPayment}>
        {processingPayment ? 'Processing...' : 'Confirm Payment'}
      </button>

      <button style={{marginLeft:'10px'}}onClick={onClose} disabled={processingPayment}>
        Cancel
      </button>
    </Modal>
  );
};

export default PaymentModal;
