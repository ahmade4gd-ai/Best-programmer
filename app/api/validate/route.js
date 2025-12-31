import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { code, language, expectedSnippet } = await req.json();


    const forbiddenPatterns = [/require\(/, /process\./, /exec\(/, /eval\(/];
    const isMalicious = forbiddenPatterns.some(pattern => pattern.test(code));

    if (isMalicious) {
      return NextResponse.json({ success: false, error: "SECURITY_VIOLATION: Malicious code detected" }, { status: 403 });
    }

    const isValid = code.replace(/\s/g, '').includes(expectedSnippet.replace(/\s/g, ''));

    return NextResponse.json({
      success: isValid,
      details: isValid ? "Logic bypass successful" : "Firewall blocked the request",
      executionTime: "0.002ms"
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
