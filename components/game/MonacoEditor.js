"use client";
import Editor from '@monaco-editor/react';

export default function MonacoEditor({ language, value, onChange }) {
  return (
    <div className="h-full w-full border-t border-cyan-900/30">
      <Editor
        height="100%"
        language={language}
        value={value}
        theme="vs-dark"
        onChange={(val) => onChange(val)}
        options={{
          fontSize: 16,
          fontFamily: "'JetBrains Mono', monospace",
          minimap: { enabled: false },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 20 },
          cursorSmoothCaretAnimation: "on",
          lineNumbers: "on",
          renderLineHighlight: "all",
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden'
          }
        }}
      />
    </div>
  );
}
