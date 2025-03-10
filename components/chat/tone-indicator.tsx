"use client";

interface ToneIndicatorProps {
  tone: string;
}

export function ToneIndicator({ tone }: ToneIndicatorProps) {
  const getToneLabel = () => {
    switch (tone) {
      case "wife":
        return "Wife Mode";
      case "mother":
        return "Mother Mode";
      case "friend":
        return "Friend Mode";
      case "assistant":
        return "Assistant Mode";
      default:
        return "Friend Mode";
    }
  };
  
  const getToneColor = () => {
    switch (tone) {
      case "wife":
        return "bg-pink-100 text-pink-800";
      case "mother":
        return "bg-purple-100 text-purple-800";
      case "friend":
        return "bg-green-100 text-green-800";
      case "assistant":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };
  
  return (
    <div className={`${getToneColor()} px-3 py-1 rounded-full text-xs font-medium`}>
      {getToneLabel()}
    </div>
  );
}