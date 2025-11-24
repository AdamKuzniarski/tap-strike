"use client";

import type { GameStatus } from "../types";
interface GameControlsProps {
  status: GameStatus;
  onStart: () => void;
  onReset: () => void;
}

export function GameControls({ status, onStart, onReset }: GameControlsProps) {
  const isRunning = status === "running";

  return (
    <section className="flex flex-col intems-center gap-3">
      <div className="flex gap-3">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-lime-500 text-slate-900 hover:bg-lime-400 transition border border-lime-400"
          >
            {status === "idle" ? "Start" : "Nochmal spielen"}
          </button>
        ) : (
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 hover:bg-slate-700 transition border border-slate-700"
          >
            Abbrechen
          </button>
        )}
      </div>
    </section>
  );
}
