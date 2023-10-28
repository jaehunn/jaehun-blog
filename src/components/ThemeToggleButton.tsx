'use client';

import { useTheme } from 'next-themes';
import { HiOutlineLightBulb } from '@react-icons/all-files/hi/HiOutlineLightBulb';
import { HiLightBulb } from '@react-icons/all-files/hi/HiLightBulb';

import * as styles from './ThemeToggleButton.css';

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  const handleClickButton = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(nextTheme);
  };

  return (
    <div className={styles['wrapper']}>
      <button onClick={handleClickButton} aria-label="Change the theme">
        {theme === 'light' ? <HiLightBulb size={20} /> : <HiOutlineLightBulb size={20} />}
      </button>
    </div>
  );
};

export default ThemeToggleButton;
