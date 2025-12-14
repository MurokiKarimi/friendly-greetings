import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Trophy, Frown, Handshake } from 'lucide-react';

type Player = 'X' | 'O' | null;
type Board = Player[];

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6], // diagonals
];

const checkWinner = (board: Board): Player => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const getWinningLine = (board: Board): number[] | null => {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo;
    }
  }
  return null;
};

const getEmptySquares = (board: Board): number[] => {
  return board.map((val, idx) => val === null ? idx : -1).filter(idx => idx !== -1);
};

// Easy AI: makes random moves
const getEasyMove = (board: Board): number => {
  const emptySquares = getEmptySquares(board);
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinning: boolean;
  index: number;
}

const Square = ({ value, onClick, isWinning, index }: SquareProps) => {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (value) {
      setIsNew(true);
      const timer = setTimeout(() => setIsNew(false), 400);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <button
      onClick={onClick}
      className={`
        aspect-square w-full rounded-lg text-4xl sm:text-5xl md:text-6xl font-bold
        transition-all duration-200 font-display
        ${!value ? 'hover:bg-muted cursor-pointer hover:scale-105' : 'cursor-default'}
        ${isWinning ? 'bg-game-win/20 ring-4 ring-game-win animate-pulse-glow' : 'bg-game-board'}
        ${isNew ? 'animate-bounce-in' : ''}
      `}
      disabled={!!value}
    >
      {value === 'X' && (
        <span className="text-game-x drop-shadow-lg">✕</span>
      )}
      {value === 'O' && (
        <span className="text-game-o drop-shadow-lg">○</span>
      )}
    </button>
  );
};

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Player>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  // AI move effect
  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        const move = getEasyMove(board);
        if (move !== undefined) {
          makeMove(move, 'O');
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, gameOver, board]);

  const makeMove = (index: number, player: Player) => {
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
      setWinningLine(getWinningLine(newBoard));
    } else if (getEmptySquares(newBoard).length === 0) {
      setGameOver(true);
    } else {
      setIsPlayerTurn(player === 'O');
    }
  };

  const handleClick = (index: number) => {
    if (board[index] || gameOver || !isPlayerTurn) return;
    makeMove(index, 'X');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinner(null);
    setWinningLine(null);
  };

  const getStatusMessage = () => {
    if (winner === 'X') {
      return { icon: Trophy, text: "You won! Amazing! 🎉", color: "text-game-win" };
    }
    if (winner === 'O') {
      return { icon: Frown, text: "Sophie wins this round!", color: "text-primary" };
    }
    if (gameOver) {
      return { icon: Handshake, text: "It's a tie! Good game!", color: "text-secondary" };
    }
    if (isPlayerTurn) {
      return { icon: null, text: "Your turn! Pick a square", color: "text-foreground" };
    }
    return { icon: null, text: "Sophie is thinking...", color: "text-muted-foreground" };
  };

  const status = getStatusMessage();

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Status */}
      <div className={`text-center mb-6 min-h-[3rem] flex items-center justify-center gap-2 ${status.color}`}>
        {status.icon && <status.icon className="w-6 h-6" />}
        <span className="text-xl font-semibold font-display">{status.text}</span>
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-card rounded-2xl shadow-xl border-2 border-border">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            isWinning={winningLine?.includes(index) || false}
            index={index}
          />
        ))}
      </div>

      {/* Play Again Button */}
      {gameOver && (
        <div className="mt-6 text-center animate-bounce-in">
          <Button
            onClick={resetGame}
            size="lg"
            className="gap-2 text-lg font-display rounded-full px-8"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
