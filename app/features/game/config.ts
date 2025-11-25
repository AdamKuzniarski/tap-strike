import type { Difficulty, GameConfig } from "./types";

export const DIFFICULTY_CONFIGS: Record<Difficulty, GameConfig> = {
  easy: {
    gridSize: 3,
    roundDurationMs: 1100,
    gameDurationSeconds: 40,
    maxMisses: 5,
  },
  normal: {
    gridSize: 3,
    roundDurationMs: 900,
    gameDurationSeconds: 30,
    maxMisses: 3,
  },
  hard: {
    gridSize: 3,
    roundDurationMs: 900,
    gameDurationSeconds: 30,
    maxMisses: 2,
  },
};

export const DEFAULT_DIFFICULTY: Difficulty = "normal";

export const DEFAULT_GAME_CONFIG: GameConfig =
  DIFFICULTY_CONFIGS[DEFAULT_DIFFICULTY];
