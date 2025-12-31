"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  
  const [gameState, setGameState] = useState({
    currentLevel: 1,
    totalPoints: 0,
    completedLevels: [],
    unlockedSites: ["البتراء"], 
    lastLogin: null,
    inventory: []
  });

  useEffect(() => {
    const savedGame = localStorage.getItem('cyberQuest_v1');
    if (savedGame) {
      setGameState(JSON.parse(savedGame));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cyberQuest_v1', JSON.stringify(gameState));
  }, [gameState]);

  const unlockLevel = (levelId, points, siteName) => {
    setGameState(prev => {
      const isNewLevel = !prev.completedLevels.includes(levelId);
      
      let newSites = [...prev.unlockedSites];
      if (siteName && !newSites.includes(siteName)) {
        newSites.push(siteName);
      }

      return {
        ...prev,
        totalPoints: prev.totalPoints + (isNewLevel ? points : 0),
        completedLevels: isNewLevel ? [...prev.completedLevels, levelId] : prev.completedLevels,
        currentLevel: levelId + 1,
        unlockedSites: newSites
      };
    });
  };

  const resetGame = () => {
    const initialState = {
      currentLevel: 1,
      totalPoints: 0,
      completedLevels: [],
      unlockedSites: ["البتراء"],
      lastLogin: Date.now(),
      inventory: []
    };
    setGameState(initialState);
    localStorage.removeItem('cyberQuest_v1');
  };

  return (
    <GameContext.Provider value={{ 
      ...gameState, 
      unlockLevel,
      completeLevel: unlockLevel, 
      resetGame,
      isLevelCompleted: (id) => gameState.completedLevels.includes(id)
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGameStore = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameStore must be used within a GameProvider');
  }
  return context;
};

export const useGame = useGameStore;
      
