"use client";

import { useEffect } from "react";
import { useGameStore } from "../store";
import { GameGrid } from "./GameGrid";
import { GameHUD } from "./GameHUD";
import { GameControls } from "./GameControls";

export function GameScreen() {
  const {
    status,
    score,
    misses,
    timeLeft,
    activeIndex,
    start,
    reset,
    handleTileClick,
    cleanup,
    config,
  } = useGameStore();

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  const isRunning = status === "running";

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl p-6 flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Tap-Strike <span className="text-lime-400">Arcade</span>
          </h1>
          <p className="text-sm text-slate-400">
            Triff das aktive feld schnell wie möglich. Train your reflexes
            solider!ier 🫡
          </p>
        </header>
        <GameHUD
          score={score}
          misses={misses}
          maxMisses={config.maxMisses}
          timeLeft={timeLeft}
        />
        <GameGrid
          gridSize={config.gridSize}
          activeIndex={activeIndex}
          isRunning={isRunning}
          onTileClick={handleTileClick}
        />
        <GameControls status={status} onStart={start} onReset={reset} />
      </div>
    </main>
  );
}
