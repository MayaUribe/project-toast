import React from 'react';

import useKeydown from '../hooks/useKeydown';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const handleEscape = React.useCallback(() => setToasts([]), []);
  useKeydown('Escape', handleEscape);

  const dismissToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  const createToast = (message, variant) => {
    setToasts([...toasts, { id: crypto.randomUUID(), message, variant }]);
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        createToast,
        dismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
