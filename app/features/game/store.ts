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
  timeLeft: number;
  config: GameConfig;

  //Actions

  start: () => void;
  reset: () => void;
  handleTileClick: (index: number) => void;
  setConfig: (config: GameConfig) => void;
  cleanup: () => void; // hilfsFunction bie unmount
}

export const useGameStore = create<GameStore>((set, get) => {
  function endGame() {
    clearRoundTimeout();
    clearCountdownInterval();
    set((state) => ({
      ...state,
      status: "game-over",
      activeIndex: null,
    }));
  }

  function scheduleNextRound() {
    clearRoundTimeout();
    const { config } = get();
    const totalTiles = config.gridSize * config.gridSize;
    const randomIndex = Math.floor(Math.random() * totalTiles);

    set((state) => ({
      ...state,
      activeIndex: randomIndex,
    }));

    roundTimeoutId = setTimeout(() => {
      set((state) => {
        const nextMisses = state.misses + 1;
        if (nextMisses >= state.config.maxMisses) {
          endGame();
          return { ...state, misses: nextMisses };
        }
        //nächste Runde
        scheduleNextRound();
        return { ...state, misses: nextMisses };
      });
    }, config.roundDurationMs);
  }

  function startCountdown() {
    clearCountdownInterval();
    countdownIntervalId = setInterval(() => {
      set((state) => {
        if (state.timeLeft <= 1) {
          clearCountdownInterval();
          endGame();
          return { ...state, timeLeft: 0 };
        }
        return { ...state, timeLeft: state.timeLeft - 1 };
      });
    }, 1000);
  }
  return {
    status: "idle",
    activeIndex: null,
    score: 0,
    misses: 0,
    timeLeft: DEFAULT_GAME_CONFIG.gameDurationSeconds,
    config: DEFAULT_GAME_CONFIG,

    start: () => {
      const { config } = get();
      clearRoundTimeout();
      clearCountdownInterval();
      set({
        status: "running",
        activeIndex: null,
        score: 0,
        misses: 0,
        timeLeft: config.gameDurationSeconds,
        config,
      });
      scheduleNextRound();
      startCountdown();
    },

    reset: () => {
      const { config } = get();
      clearRoundTimeout();
      clearCountdownInterval();
      set({
        status: "idle",
        activeIndex: null,
        score: 0,
        misses: 0,
        timeLeft: config.gameDurationSeconds,
        config,
      });
    },

    handleTileClick: (index: number) => {
      const state = get();
      if (state.status !== "running" || state.activeIndex === null) return;

      if (index === state.activeIndex) {
        //Treffer
        set((prev) => ({
          ...prev,
          score: prev.score + 1,
        }));
        scheduleNextRound();
      } else {
        // Miss
        set((prev) => {
          const nextMisses = prev.misses + 1;
          if (nextMisses >= prev.config.maxMisses) {
            endGame();
          }
          return { ...prev, misses: nextMisses };
        });
      }
    },

    setConfig: (config: GameConfig) => {
      set((state) => ({
        ...state,
        config,
        timeLeft: config.gameDurationSeconds,
      }));
    },
    cleanup: () => {
      clearRoundTimeout();
      clearCountdownInterval();
      set((state) => ({
        ...state,
        status: "idle",
        activeIndex: null,
        score: 0,
        misses: 0,
        timeLeft: state.config.gameDurationSeconds,
      }));
    },
  };
});
