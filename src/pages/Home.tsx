import React, { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import ChessboardComponent from '../components/Chessboard';
import { initGame, movePiece, isGameOver, getPossibleMoves, resetGame } from '../utils/chessLogic';
import { GameMode, GameState, TimerConfig } from '../types/chessTypes';

const Home: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    mode: 'pvp',
    timer: 600,
    playerTurn: 'white',
    game: initGame(),
    whiteTime: 600,
    blackTime: 600,
    isRunning: false,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setGameState(prev => {
        const newState = { ...prev };
        if (prev.playerTurn === 'white') {
          newState.whiteTime -= 1;
        } else {
          newState.blackTime -= 1;
        }
        return newState;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = (config: TimerConfig) => {
    setGameState(prev => ({
      ...prev,
      whiteTime: config.initialTime,
      blackTime: config.initialTime,
      isRunning: false,
    }));
    stopTimer();
  };

  const onPieceDrop = (sourceSquare: string, targetSquare: string) => {
    const gameCopy = new Chess(gameState.game.fen());
    const move = movePiece(gameCopy, sourceSquare, targetSquare);
    
    if (move) {
      setGameState(prev => {
        const newState = {
          ...prev,
          game: gameCopy,
          playerTurn: prev.playerTurn === 'white' ? 'black' : 'white',
        };
        if (!prev.isRunning) {
          newState.isRunning = true;
          startTimer();
        }
        return newState;
      });
      return true;
    }
    return false;
  };

  const handleNewGame = (mode: GameMode, timerConfig: TimerConfig) => {
    setGameState({
      mode,
      timer: timerConfig.initialTime,
      playerTurn: 'white',
      game: resetGame(),
      whiteTime: timerConfig.initialTime,
      blackTime: timerConfig.initialTime,
      isRunning: false,
    });
    stopTimer();
  };

  useEffect(() => {
    if (isGameOver(gameState.game)) {
      stopTimer();
    }
  }, [gameState.game]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Chess Training App</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <ChessboardComponent
            position={gameState.game.fen()}
            onPieceDrop={onPieceDrop}
          />
        </div>
        <div className="flex-1 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Game Info</h2>
          <p>Mode: {gameState.mode}</p>
          <p>White Time: {gameState.whiteTime} seconds</p>
          <p>Black Time: {gameState.blackTime} seconds</p>
          <p>Turn: {gameState.playerTurn}</p>
          <div className="mt-4 space-x-2">
            <button
              onClick={() => handleNewGame('pvp', { initialTime: 600 })}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              New PvP Game
            </button>
            <button
              onClick={() => handleNewGame('pve', { initialTime: 600 })}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              New PvE Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;