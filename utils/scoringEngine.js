export const calculateFinalScore = (basePoints, startTime, difficultyMultiplier) => {
  const endTime = Date.now();
  const timeTakenSeconds = (endTime - startTime) / 1000;
  
  
  const speedBonus = Math.max(0, 500 - (timeTakenSeconds * 5));
  const totalRaw = (basePoints * difficultyMultiplier) + speedBonus;
  
  return {
    finalScore: Math.floor(totalRaw),
    timeGrade: timeTakenSeconds < 30 ? 'S' : timeTakenSeconds < 60 ? 'A' : 'B',
    bonusApplied: Math.floor(speedBonus)
  };
};
