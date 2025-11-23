"use client";

interface GameGridProps {
  gridSize: number;
  activeIndex: number | null;
  isRunning: boolean;
  onTileClick: (index: number) => void;
}

export function GameGrid({
  gridSize,
  activeIndex,
  isRunning,
  onTileClick,
}: GameGridProps) {
  const totalTiles = gridSize * gridSize;
  return (
    <section className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
        {Array.from({ length: totalTiles }).map((_, index) => {
          const isActive = index === activeIndex && isRunning;

          return (
            <button
              key={index}
              onClick={() => onTileClick(index)}
              className={`aspect-square rounded-xl border transition 
                ${
                  isActive
                    ? "border-lime-400 bg-lime-500/80 shadow-lg shadow-lime-500/40 scale-[1.05]"
                    : "border-slate-700 bg-slate-900 hover:bg-slate-800"
                }`}
            />
          );
        })}
      </div>
    </section>
  );
}
