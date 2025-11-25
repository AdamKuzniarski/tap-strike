"use client";

import type { GameStatus, Difficulty } from "../types";
interface GameControlsProps {
  status: GameStatus;
  difficulty: Difficulty;
  onChangeDifficulty: (difficulty: Difficulty) => void;
  onStart: () => void;
  onReset: () => void;
}

export function GameControls({
  status,
  difficulty,
  onChangeDifficulty,
  onStart,
  onReset,
}: GameControlsProps) {
  const isRunning = status === "running";
  const levels: Difficulty[] = ["easy", "normal", "hard"];

  const labelFor = (level: Difficulty) => {
    switch (level) {
      case "easy":
        return "Easy";
      case "normal":
        return "Normal";
      case "hard":
        return "Hard";
    }
  };

  return (
    <section className="flex flex-col items-center gap-3">
      {/* Difficulty Switch */}
      <div className="flex gap-2 text-[11px]">
        {levels.map((level) => {
          const isActive = level === difficulty;
          return (
            <button
              key={level}
              type="button"
              disabled={isRunning}
              onClick={() => onChangeDifficulty(level)}
              className={`px-3 py-1 rounded-full border uppercase tracking-wide transition
                ${
                  isActive
                    ? "bg-lime-500 text-slate-900 border-lime-400"
                    : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                }
                ${isRunning ? "opacity-60 cursor-not-allowed" : ""}
              `}
            >
              {labelFor(level)}
            </button>
          );
        })}
      </div>

      {/* Start / Reset */}
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
