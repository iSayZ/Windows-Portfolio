import React from 'react';

interface SuccessMessageProps {
  onBack: () => void;
}

export const SuccessMessage = ({ onBack }: SuccessMessageProps) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center">
    <div className="text-4xl">🎉</div>
    <h2 className="text-xl font-bold text-foreground">Message Submitted!</h2>
    <p className="text-sm text-foreground opacity-90">
      Your message is awaiting approval.
    </p>
    <button
      onClick={onBack}
      className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      Back to Guest Book
    </button>
  </div>
);
