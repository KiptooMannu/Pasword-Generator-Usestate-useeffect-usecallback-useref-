import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './PasswordGenerator.module.scss';

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characterSet = chars;
    if (includeNumbers) characterSet += numbers;
    if (includeSymbols) characterSet += symbols;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterSet.length);
      newPassword += characterSet[randomIndex];
    }

    setPassword(newPassword);
  }, [length, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    passwordRef.current.select();
    document.execCommand('copy');
  };

  return (
    <div className={styles.container}>
      <h1>Password Generator</h1>
      <div className={styles.settings}>
        <label>
          Length:
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min="1"
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Include Symbols
        </label>
      </div>
      <div className={styles.result}>
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className={styles.password}
        />
        <button onClick={handleCopy} className={styles.copyButton}>
          Copy
        </button>
      </div>
      <button onClick={generatePassword} className={styles.generateButton}>
        Generate Password
      </button>
    </div>
  );
}

export default PasswordGenerator;
