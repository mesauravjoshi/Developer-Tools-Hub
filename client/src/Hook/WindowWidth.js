import { useState, useEffect, useRef } from 'react'

export default function WindowWidth() {
  const [width, setWidth] = useState('0');

  const throttle = (func, delay) => {
    let lastCall = 0
    return (...args) => {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    }
  }

  useEffect(() => {
    setWidth(window.innerWidth)
    const resizeListener = () => setWidth(window.innerWidth);
    const throttledResize  = throttle(resizeListener,300)

    window.addEventListener('resize', throttledResize );

    return () => {
      window.removeEventListener('resize', throttledResize )
    }
  }, [])

  return [width]
}
