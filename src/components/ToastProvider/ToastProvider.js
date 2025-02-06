import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const dismissAllToasts = (e) => {
      if (e.key === 'Escape') {
        setToasts([]);
      }
    };

    window.addEventListener('keydown', dismissAllToasts);

    return () => {
      window.removeEventListener('keydown', dismissAllToasts);
    };
  }, []);

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
