"use client";
import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { runValidation } from '@/utils/codeRunner';
import { calculateFinalScore } from '@/utils/scoringEngine';

export const useBypassLogic = () => {
  const { currentLevel, completeLevel } = useGame();
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const executeBypass = async (userCode, challenge) => {
    setIsProcessing(true);
    
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {

      const validation = runValidation(userCode, challenge.solutionSnippet, challenge.language);

      if (validation.success) {
      
        const { finalScore } = calculateFinalScore(
          challenge.points, 
          Date.now(), 
          challenge.difficultyMultiplier || 1.0
        );

        
        completeLevel(challenge.id, finalScore, challenge.site);
        
        setLastResult({ success: true, score: finalScore });
        return { success: true, score: finalScore };
      } else {
        setLastResult({ success: false, error: validation.error });
        return { success: false, error: validation.error };
      }
    } catch (err) {
      setLastResult({ success: false, error: "SYSTEM_CRASH: " + err.message });
      return { success: false, error: err.message };
    } finally {
      setIsProcessing(false);
    }
  };

  return { executeBypass, isProcessing, lastResult };
};
          
