import { useState } from "react";
import "../Board-row.css";
import "../square.css";

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
    if (square[i]) {
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

  return (
    <>
      <div className="Board-size">
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

export default Board;
