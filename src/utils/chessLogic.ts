import { Chess } from 'chess.js';

export const initGame = () => {
  return new Chess();
};

export const movePiece = (game: Chess, from: string, to: string) => {
  const move = game.move({ from, to });
  return move;
};

export const isGameOver = (game: Chess) => {
  return game.isGameOver();
};

export const getPossibleMoves = (game: Chess, square: string) => {
  const moves = game.moves({ square, verbose: true });
  return moves;
};

export const resetGame = () => {
  return new Chess();
};
