import React, { useEffect, useState } from 'react';

const ShowAlert = ({ message, type, clearError, duration = 3000 }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsOpen(false), duration);
    return () => clearTimeout(timeout); // Cleanup function for timer
  }, [message, type, duration, clearError]);

  const handleClose = () => {
    setIsOpen(false);
    if (clearError) clearError(); // Call clearError function if provided
  };

  return isOpen && ( // Render Alert only if isOpen is true
    <Alert message={message} type={type} onClose={handleClose} clearError={clearError} />
  );
};

const Alert = ({ message, type, duration = 3000, onClose, clearError }) => {
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
        clearError();
      }, duration);
  
      return () => clearTimeout(timer);
    }, [duration, onClose, clearError]);
  
    if (!visible) return null;
  
    return (
      <div className={`alert alert-${type}`}>
        {message}
      </div>
    );
};

export default ShowAlert;

