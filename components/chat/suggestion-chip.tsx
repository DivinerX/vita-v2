"use client";

interface SuggestionChipProps {
  text: string;
  onClick: () => void;
}

export function SuggestionChip({ text, onClick }: SuggestionChipProps) {
  return (
    <button 
      className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm hover:bg-secondary/80 transition-colors"
      onClick={onClick}
    >
      {text}
    </button>
  );
}