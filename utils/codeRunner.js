export const runValidation = (userCode, solutionSnippet, language) => {
  try {
    
    const sanitizedCode = userCode.replace(/\s+/g, '').replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
    const sanitizedSnippet = solutionSnippet.replace(/\s+/g, '');

    
    // في المشاريع المتقدمة يتم إرسال الكود إلى Backend Container (Docker)
    const isLogicValid = sanitizedCode.includes(sanitizedSnippet);
    

    if (language === 'javascript') {
      new Function(userCode); 
    }

    return {
      success: isLogicValid,
      error: isLogicValid ? null : "Security Protocol Failed: Logic Inconsistency Detected",
      timestamp: Date.now()
    };
  } catch (err) {
    return {
      success: false,
      error: `Syntax Error: ${err.message}`,
      timestamp: Date.now()
    };
  }
};
    
