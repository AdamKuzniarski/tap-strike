"use client";

import { create } from "zustand";
import { DEFAULT_GAME_CONFIG } from "./config";
import type { GameConfig, GameStatus } from "./types";

// Timer außerhalb des Stores

let roundTimeoutId: ReturnType<typeof setTimeout> | null = null;
let countdownIntervalId: ReturnType<typeof setInterval> | null = null;

function clearRoundTimeout() {
  if (roundTimeoutId) {
    clearTimeout(roundTimeoutId);
    roundTimeoutId = null;
  }
}

function clearCountdownInterval() {
  if (countdownIntervalId) {
    clearInterval(countdownIntervalId);
    countdownIntervalId = null;
  }
}

export interface GameStore {
  status: GameStatus;
  activeIndex: number | null;
  score: number;
  misses: number;
  timerLeft: number;
  config: GameConfig;

  //Actions

  start: () => void;
  reset: () => void;
  handleTileClick: (index: number) => void;
  setConfig: (config: GameConfig) => void;
  cleanup: () => void; // hilfsFunction bie unmount
}

export const useGameStore = create<GameStore>((set, get) => {
  const endGame = () => {
    clearRoundTimeout();
    clearCountdownInterval();
    set((state) => ({
      ...state,
      status: "game-over",
      activeIndex: null,
    }));
  };
});
