export type GameStatus = "idle" | "running" | "paused" | "game-over";

export type Difficulty = "easy" | "normal" | "hard";

export interface GameConfig {
  gridSize: number;
  roundDurationMs: number;
  gameDurationSeconds: number;
  maxMisses: number;
}

export interface GameState {
  status: GameStatus;
  activeIndex: number | null;
  score: number;
  misses: number;
  timeLeft: number;
}
