import React from 'react';

import Button from '../Button';
import styles from './ToastPlayground.module.css';
import ToastShelf from '../ToastShelf/ToastShelf';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = React.useState('');
  const [toasts, setToasts] = React.useState([]);

  const handlePopToast = (event) => {
    event.preventDefault();

    setToasts([...toasts, { id: crypto.randomUUID(), message, variant }]);
    setMessage('');
    setVariant(VARIANT_OPTIONS[0]);
  };

  const handleDismissToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {toasts.length > 0 && (
        <ToastShelf toasts={toasts} handleDismissToast={handleDismissToast} />
      )}

      <div className={styles.controlsWrapper}>
        <form onSubmit={handlePopToast}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: 'baseline' }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                className={styles.messageInput}
                value={message}
                required
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((option) => {
                const id = `variant-${option}`;
                return (
                  <label key={id} htmlFor={id}>
                    <input
                      id={id}
                      type="radio"
                      name={option}
                      value={option}
                      tabIndex="0"
                      checked={option === variant}
                      onChange={(event) => setVariant(event.target.value)}
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button type="submit">Pop Toast!</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ToastPlayground;
