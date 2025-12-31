export const runValidation = (userCode, solutionSnippet, language) => {
  const startTime = performance.now();
  
  if (!userCode || userCode.trim() === "") {
    return { 
      success: false, 
      error: "VOID_INPUT: Payload buffer is empty. System idle.",
      status: "STAGNANT"
    };
  }

  // 1. Advanced Cheat Detection (Security Filter)
  const forbiddenPatterns = [
    { pattern: /eval\(/, label: "ILLEGAL_EVAL_INJECTION" },
    { pattern: /<script/, label: "XSS_VULNERABILITY_DETECTED" },
    { pattern: /localStorage/, label: "STORAGE_DATA_LEAK" }
  ];

  for (const item of forbiddenPatterns) {
    if (item.pattern.test(userCode)) {
      return {
        success: false,
        error: `MALICIOUS_ACTIVITY: ${item.label}. Connection terminated.`,
        status: "COMPROMISED"
      };
    }
  }

  try {
    // 2. Syntax Validation with Sandbox Check
    if (language === 'javascript' || language === 'js') {
      try {
        new Function(userCode);
      } catch (syntaxErr) {
        return {
          success: false,
          error: `CORRUPTED_PACKET: ${syntaxErr.message.toUpperCase()}`,
          status: "PARSING_ERROR"
        };
      }
    }

    // 3. Logic Signature Analysis (Fuzzy Logic Matching)
    const normalize = (str) => {
      return str
        .replace(/\s+/g, '') // Remove all whitespaces
        .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '') // Strip comments
        .replace(/["']/g, '"') // Normalize quotes
        .replace(/;$/g, '') // Remove trailing semicolons
        .toLowerCase();
    };

    const userSignature = normalize(userCode);
    const targetSignature = normalize(solutionSnippet);

    // Deep match check
    const isLogicCorrect = userSignature.includes(targetSignature);
    
    // 4. Performance Metrics (Simulation)
    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(4);
    const memorySim = (Math.random() * (12.5 - 2.1) + 2.1).toFixed(2);

    if (isLogicCorrect) {
      return {
        success: true,
        error: null,
        status: "ACCESS_GRANTED",
        metrics: {
          speed: `${executionTime}ms`,
          memory: `${memorySim}MB`,
          threatLevel: "Negligible"
        },
        robotComment: "Logic signature verified. Firewall bypass successful.",
        timestamp: new Date().toISOString()
      };
    }

    return {
      success: false,
      error: "LOGIC_MISMATCH: Injected code fails to satisfy the cryptographic lock.",
      status: "DENIED",
      robotComment: "Intrusion detected. Logic does not align with target architecture."
    };

  } catch (err) {
    return {
      success: false,
      error: `KERNEL_PANIC: Critical failure in validation engine.`,
      status: "CRITICAL_SYSTEM_ERROR"
    };
  }
};
  
