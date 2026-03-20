// context/MusicContext.js
import React, { createContext, useRef, useState } from 'react';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isMusicOn, setIsMusicOn] = useState(true);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.warn("Play failed", e));
    }
    setIsMusicOn(!isMusicOn);
  };

  return (
    <MusicContext.Provider value={{ isMusicOn, toggleMusic, audioRef }}>
      {children}
    </MusicContext.Provider>
  );
};
