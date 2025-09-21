import React from 'react';
import { Chessboard } from 'react-chessboard';

interface ChessboardProps {
  position: string;
  onPieceDrop: (sourceSquare: string, targetSquare: string) => boolean;
}

const ChessboardComponent: React.FC<ChessboardProps> = ({ position, onPieceDrop }) => {
  return (
    <div className="chessboard-container">
      <Chessboard
        position={position}
        onPieceDrop={onPieceDrop}
      />
    </div>
  );
};

export default ChessboardComponent;