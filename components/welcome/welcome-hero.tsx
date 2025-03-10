import { LifeBuoy } from "lucide-react";

export function WelcomeHero() {
  return (
    <div className="relative flex items-center justify-center w-32 h-32 mb-4">
      <div className="absolute w-24 h-24 bg-green-500/20 rounded-full animate-pulse" />
      <div className="z-10 flex items-center justify-center w-20 h-20 bg-green-500 rounded-full text-white">
        <LifeBuoy size={36} />
      </div>
    </div>
  );
}