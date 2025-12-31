export const runValidation = (userCode, solutionSnippet, language) => {
  if (!userCode || userCode.trim() === "") {
    return { 
      success: false, 
      error: "Empty Buffer: Please provide code input." 
    };
  }

  try {
    if (language === 'javascript' || language === 'js') {
      new Function(userCode); 
    }

    const clean = (str) => {
      return str
        .replace(/\s+/g, '')
        .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '')
        .toLowerCase();
    };

    const sanitizedUserCode = clean(userCode);
    const sanitizedSnippet = clean(solutionSnippet);

    const isCorrect = sanitizedUserCode.includes(sanitizedSnippet);

    return {
      success: isCorrect,
      error: isCorrect ? null : "SECURITY_MATCH_FAILED: Logic doesn't match firewall signature.",
      status: isCorrect ? "ACCESS_GRANTED" : "REJECTED",
      timestamp: new Date().toISOString()
    };

  } catch (err) {
    return {
      success: false,
      error: `SYNTAX_ERROR: ${err.message}`,
      status: "COMPILATION_FAILED"
    };
  }
};
        
