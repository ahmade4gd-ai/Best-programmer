"use client";
import { useEffect, useRef } from 'react';

export const useSoundEffects = () => {
  const audioContext = useRef(null);

  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  const playSound = (frequency, type = 'square', duration = 0.1) => {
    if (!audioContext.current) return;
    
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.current.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.current.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    oscillator.start();
    oscillator.stop(audioContext.current.currentTime + duration);
  };

  const playSuccess = () => {
    playSound(440, 'sine', 0.2);
    setTimeout(() => playSound(880, 'sine', 0.4), 100);
  };

  const playError = () => {
    playSound(110, 'sawtooth', 0.3);
    setTimeout(() => playSound(55, 'sawtooth', 0.5), 150);
  };

  const playClick = () => playSound(1200, 'triangle', 0.05);

  return { playSuccess, playError, playClick };
};
