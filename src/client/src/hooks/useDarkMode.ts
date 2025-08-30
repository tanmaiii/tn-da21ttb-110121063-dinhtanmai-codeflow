import { useState, useEffect } from 'react';

interface ChartTheme {
  textColor: string;
  gridColor: string;
  backgroundColor: string;
  axisLineColor: string;
  splitLineColor: string;
}

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Kiểm tra dark mode từ document class hoặc CSS variable
    const checkDarkMode = () => {
      const htmlElement = document.documentElement;
      const hasDarkClass = htmlElement.classList.contains('dark');
      const computedStyle = getComputedStyle(htmlElement);
      const bgColor = computedStyle.getPropertyValue('--background-1');
      
      // Kiểm tra theo class 'dark' hoặc CSS variable
      setIsDarkMode(hasDarkClass || bgColor.includes('rgb(') && bgColor.includes('30, 41, 59'));
    };

    checkDarkMode();

    // Lắng nghe thay đổi theme
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Lắng nghe thay đổi CSS variables
    window.addEventListener('storage', checkDarkMode);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', checkDarkMode);
    };
  }, []);

  const theme: ChartTheme = {
    textColor: isDarkMode ? '#e2e8f0' : '#374151',
    gridColor: isDarkMode ? '#475569' : '#e5e7eb',
    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
    axisLineColor: isDarkMode ? '#64748b' : '#d1d5db',
    splitLineColor: isDarkMode ? '#334155' : '#f3f4f6'
  };

  return { isDarkMode, theme };
}; 