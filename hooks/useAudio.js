"use client";
import { useCallback } from 'react';

const SOUNDS = {
  KEYPRESS: '/assets/sounds/keypress.mp3',
  SUCCESS: '/assets/sounds/success.mp3',
  FAILURE: '/assets/sounds/error.mp3',
  TRANSITION: '/assets/sounds/slide.mp3',
  SCAN: '/assets/sounds/scanning.mp3',
  AMBIENT: '/assets/sounds/cyber-ambient.mp3',
  ALARM: '/assets/sounds/alarm.mp3',
  NOTIFICATION: '/assets/sounds/beep.mp3'
};

export const useAudio = () => {
  const playSound = useCallback((soundType, volume = 0.5, loop = false) => {
    try {
      const audio = new Audio(SOUNDS[soundType]);
      audio.volume = volume;
      audio.loop = loop;
      audio.play().catch(e => console.warn("Audio blocked by browser policy"));
      return audio;
    } catch (error) {
      console.error("Audio Engine Error:", error);
      return null;
    }
  }, []);

  return { playSound };
};
  
