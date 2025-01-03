import React, { useState, useEffect } from "react";

const GRID_SIZE = 5;
const DIAMOND_COUNT = 5;
const BOMB_COUNT = 4;

const Game = () => {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);

  const initializeGrid = () => {
    let newGrid = Array(GRID_SIZE)
      .fill()
      .map(() =>
        Array(GRID_SIZE)
          .fill()
          .map(() => ({
            isDiamond: false,
            isBomb: false,
            isRevealed: false,
          }))
      );

    let diamondsPlaced = 0;
    while (diamondsPlaced < DIAMOND_COUNT) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      if (!newGrid[row][col].isDiamond && !newGrid[row][col].isBomb) {
        newGrid[row][col].isDiamond = true;
        diamondsPlaced++;
      }
    }

    let bombsPlaced = 0;
    while (bombsPlaced < BOMB_COUNT) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      if (!newGrid[row][col].isDiamond && !newGrid[row][col].isBomb) {
        newGrid[row][col].isBomb = true;
        bombsPlaced++;
      }
    }

    return newGrid;
  };

  useEffect(() => {
    setGrid(initializeGrid());
  }, []);

  const revealCell = (row, col) => {
    if (gameOver || gameWon || grid[row][col].isRevealed) return;

    const newGrid = [...grid];
    newGrid[row][col].isRevealed = true;

    if (grid[row][col].isBomb) {
      setGameOver(true);
      revealAll();
    } else if (grid[row][col].isDiamond) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore === DIAMOND_COUNT) {
          setGameWon(true);
          revealAll();
        }
        return newScore;
      });
    }

    setGrid(newGrid);
  };

  const revealAll = () => {
    const newGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        isRevealed: true,
      }))
    );
    setGrid(newGrid);
  };

  const resetGame = () => {
    setGrid(initializeGrid());
    setGameOver(false);
    setGameWon(false);
    setScore(0);
  };

  const getCellContent = (cell) => {
    if (!cell.isRevealed) {
      return (
        <img
          src="/images/question.png"
          alt="Unknown"
          className="w-12 h-12 md:w-16 md:h-16 object-contain"
        />
      );
    }
    if (cell.isDiamond) {
      return (
        <img
          src="/images/diamond.png"
          alt="Diamond"
          className="w-12 h-12 md:w-16 md:h-16 object-contain"
        />
      );
    }
    if (cell.isBomb) {
      return (
        <img
          src="/images/bomb.png"
          alt="Bomb"
          className="w-12 h-12 md:w-16 md:h-16 object-contain"
        />
      );
    }
    return "";
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-[#290023] h-auto">
      <div className="text-xl font-bold text-white">
        Diamonds Found: {score}/{DIAMOND_COUNT}
      </div>

      {(gameOver || gameWon) && (
        <div
          className={`text-xl font-bold ${
            gameWon ? "text-green-400" : "text-red-400"
          }`}
        >
          {gameWon ? "You Found All Diamonds!" : "Game Over - You Hit a Bomb!"}
        </div>
      )}

      <button
        onClick={resetGame}
        className=" magic-gradient text-white py-2 px-4 rounded  cursor-pointer"
      >
        New Game
      </button>

      <div className="container mx-auto">
        <div className="grid grid-cols-5 gap-2 md:gap-3 lg:gap-4  mx-auto">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => revealCell(rowIndex, colIndex)}
                className="aspect-square flex items-center justify-center text-2xl transition-colors duration-200 rounded-2xl"
                style={{
                  backgroundColor: "#0A0009",
                  border: "1px solid #333947",
                }}
                disabled={gameOver || gameWon}
              >
                {getCellContent(cell)}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
