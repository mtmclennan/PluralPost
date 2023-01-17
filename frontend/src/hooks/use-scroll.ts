import { useState, useEffect } from 'react';

const useScroll = () => {
  const [yOffset, setYOffset] = useState(window.pageYOffset);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleScroll() {
    const currentYOffset = window.pageYOffset;
    const hide = yOffset < currentYOffset;

    setYOffset(currentYOffset);
    setHide(hide);
  }

  return hide;
};

export default useScroll;
