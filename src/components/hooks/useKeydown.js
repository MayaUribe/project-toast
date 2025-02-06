import React from 'react';

const useKeydown = (key, callback) => {
  React.useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === key) {
        callback(e);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [callback, key]);
};

export default useKeydown;
