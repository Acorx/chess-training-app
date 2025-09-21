export type GameMode = 'pvp' | 'pve';

export interface GameState {
  mode: GameMode;
  timer: number;
  playerTurn: 'white' | 'black';
  game: Chess;
  whiteTime: number;
  blackTime: number;
  isRunning: boolean;
}

export type TimerConfig = {
  initialTime: number;
  increment?: number;
};
