import React, { useState } from 'react';
import { useDarkMode } from '../../context/dark_mode_context';
import styles from './theme_toggler.module.css';

function ThemeToggler() {
  const { scheme, darkMode, setTheme, toggleDarkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      toggleDarkMode();
    }
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={styles.container}
      onContextMenu={handleContextMenu}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${styles.toggle}${darkMode ? ` ${styles.none}` : ''}`}
        onClick={handleToggle}
      >
        <i className='fa-solid fa-sun' />
      </div>
      <div
        className={`${styles.toggle}${darkMode ? '' : ` ${styles.none}`}`}
        onClick={handleToggle}
      >
        <i className='fa-solid fa-moon' />
      </div>
      {isOpen && (
        <ul className={styles.themes}>
          <li className={styles.theme}>
            <input
              type='checkbox'
              id='light'
              checked={scheme === 'light'}
              onChange={(_e) => setTheme!('light')}
            />
            <label className={styles.label} htmlFor='light'>
              <div className={styles.icon}>
                <i className='fa-solid fa-sun' />
              </div>
              <span>Light</span>
            </label>
          </li>
          <li className={styles.theme}>
            <input
              type='checkbox'
              id='dark'
              checked={scheme === 'dark'}
              onChange={(_e) => setTheme!('dark')}
            />
            <label className={styles.label} htmlFor='dark'>
              <div className={styles.icon}>
                <i className='fa-solid fa-moon' />
              </div>
              <span>Dark</span>
            </label>
          </li>
          <li className={styles.theme}>
            <input
              type='checkbox'
              id='system'
              checked={scheme === 'system'}
              onChange={(_e) => setTheme!('system')}
            />
            <label className={styles.label} htmlFor='system'>
              <div className={styles.icon}>
                <i className='fa-solid fa-gear' />
              </div>
              <span>System</span>
            </label>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ThemeToggler;
