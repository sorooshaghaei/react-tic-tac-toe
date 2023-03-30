import { useState } from "react";
import "../style.css";

const Square = ({ value, setValue }) => {
  return (
    <button className="square" onClick={() => setValue()}>
      {value}
    </button>
  );
};

const Board = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [square, setSquare] = useState(Array(9).fill(null));

  const clickHandler = (i) => {
    if (square[i] || CalculateWinner(square)) {
      return;
    }

    const nextSquare = square.slice();
    if (xIsNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }

    setSquare(nextSquare);
    setXIsNext(!xIsNext);
  };

  const winner = CalculateWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (square.every((i) => i !== null) && !winner) {
    status = "Tie game!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="Board-size">
        <div className="status">{status}</div>
        <div className="Board-row">
          <Square value={square[0]} setValue={() => clickHandler(0)} />
          <Square value={square[1]} setValue={() => clickHandler(1)} />
          <Square value={square[2]} setValue={() => clickHandler(2)} />
        </div>
        <div className="Board-row">
          <Square value={square[3]} setValue={() => clickHandler(3)} />
          <Square value={square[4]} setValue={() => clickHandler(4)} />
          <Square value={square[5]} setValue={() => clickHandler(5)} />
        </div>
        <div className="Board-row">
          <Square value={square[6]} setValue={() => clickHandler(6)} />
          <Square value={square[7]} setValue={() => clickHandler(7)} />
          <Square value={square[8]} setValue={() => clickHandler(8)} />
        </div>
      </div>
    </>
  );
};

const CalculateWinner = (square) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
};

export default Board;
