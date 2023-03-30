// the history and Lifting state up, again 
// You will now write a new top-level component called Game to display a list of past moves. That’s where you will place the history state that contains the entire game history.

// Placing the history state into the Game component will let you remove the squares state from its child Board component. Just like you “lifted state up” from the Square component into the Board component, you will now lift it up from the Board into the top-level Game component. This gives the Game component full control over the Board’s data and lets it instruct the Board to render previous turns from the history.

// First, add a Game component with export default. Have it render the Board component and some markup:

// function Board() {
//   // ...
// }

// export default function Game() {
//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board />
//       </div>
//       <div className="game-info">
//         <ol>{/*TODO*/}</ol>
//       </div>
//     </div>
//   );
// }
// Note that you are removing the export default keywords before the function Board() { declaration and adding them before the function Game() { declaration. This tells your index.js file to use the Game component as the top-level component instead of your Board component. The additional divs returned by the Game component are making room for the game information you’ll add to the board later.

// Add some state to the Game component to track which player is next and the history of moves:

// export default function Game() {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   // ...
// Notice how [Array(9).fill(null)] is an array with a single item, which itself is an array of 9 nulls.

// To render the squares for the current move, you’ll want to read the last squares array from the history. You don’t need useState for this—you already have enough information to calculate it during rendering:

// export default function Game() {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const currentSquares = history[history.length - 1];
//   // ...
// Next, create a handlePlay function inside the Game component that will be called by the Board component to update the game. Pass xIsNext, currentSquares and handlePlay as props to the Board component:

// export default function Game() {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const currentSquares = history[history.length - 1];

//   function handlePlay(nextSquares) {
//     // TODO
//   }

//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
//         //...
//   )
// }
// Let’s make the Board component fully controlled by the props it receives. Change the Board component to take three props: xIsNext, squares, and a new onPlay function that Board can call with the updated squares array when a player makes a move. Next, remove the first two lines of the Board function that call useState:

// function Board({ xIsNext, squares, onPlay }) {
//   function handleClick(i) {
//     //...
//   }
//   // ...
// }
// Now replace the setSquares and setXIsNext calls in handleClick in the Board component with a single call to your new onPlay function so the Game component can update the Board when the user clicks a square:

// function Board({ xIsNext, squares, onPlay }) {
//   function handleClick(i) {
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     const nextSquares = squares.slice();
//     if (xIsNext) {
//       nextSquares[i] = "X";
//     } else {
//       nextSquares[i] = "O";
//     }
//     onPlay(nextSquares);
//   }
//   //...
// }
// The Board component is fully controlled by the props passed to it by the Game component. You need to implement the handlePlay function in the Game component to get the game working again.

// What should handlePlay do when called? Remember that Board used to call setSquares with an updated array; now it passes the updated squares array to onPlay.

// The handlePlay function needs to update Game’s state to trigger a re-render, but you don’t have a setSquares function that you can call any more—you’re now using the history state variable to store this information. You’ll want to update history by appending the updated squares array as a new history entry. You also want to toggle xIsNext, just as Board used to do:

// export default function Game() {
//   //...
//   function handlePlay(nextSquares) {
//     setHistory([...history, nextSquares]);
//     setXIsNext(!xIsNext);
//   }
//   //...
// }
// Here, [...history, nextSquares] creates a new array that contains all the items in history, followed by nextSquares. (You can read the ...history spread syntax as “enumerate all the items in history”.)

// For example, if history is [[null,null,null], ["X",null,null]] and nextSquares is ["X",null,"O"], then the new [...history, nextSquares] array will be [[null,null,null], ["X",null,null], ["X",null,"O"]].

// At this point, you’ve moved the state to live in the Game component, and the UI should be fully working, just as it was before the refactor. Here is what the code should look like at this point:


// App.js
// Download
// Reset

// Fork
// 60
// 61
// 62
// 63
// 64
// 65
// 66
// 67
// 68
// 69
// 70
// 71
// 72
// 73
// 74
// 75
// 76
// 77
// 78
// 79
// 80
// 81
// 82
// 83
// 84
// 85
// 86
// 87
// 88
// 89
// 90
// 91
// 92
// 93
// 94
// 95
// 96
// import { useState } from 'react';
//   function handlePlay(nextSquares) {
//     setHistory([...history, nextSquares]);
//     setXIsNext(!xIsNext);
//   }

//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
//       </div>
//       <div className="game-info">
//         <ol>{/*TODO*/}</ol>
//       </div>
//     </div>
//   );
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }



// Show more
// Showing the past moves 
// Since you are recording the tic-tac-toe game’s history, you can now display a list of past moves to the player.

// React elements like <button> are regular JavaScript objects; you can pass them around in your application. To render multiple items in React, you can use an array of React elements.

// You already have an array of history moves in state, so now you need to transform it to an array of React elements. In JavaScript, to transform one array into another, you can use the array map method:

// [1, 2, 3].map((x) => x * 2) // [2, 4, 6]
// You’ll use map to transform your history of moves into React elements representing buttons on the screen, and display a list of buttons to “jump” to past moves. Let’s map over the history in the Game component:

// export default function Game() {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const currentSquares = history[history.length - 1];

//   function handlePlay(nextSquares) {
//     setHistory([...history, nextSquares]);
//     setXIsNext(!xIsNext);
//   }

//   function jumpTo(nextMove) {
//     // TODO
//   }

//   const moves = history.map((squares, move) => {
//     let description;
//     if (move > 0) {
//       description = 'Go to move #' + move;
//     } else {
//       description = 'Go to game start';
//     }
//     return (
//       <li>
//         <button onClick={() => jumpTo(move)}>{description}</button>
//       </li>
//     );
//   });

//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
//       </div>
//       <div className="game-info">
//         <ol>{moves}</ol>
//       </div>
//     </div>
//   );
// }
// You can see what your code should look like below. Note that you should see an error in the developer tools console that says: Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `Game`. You’ll fix this error in the next section.


// App.js
// Download
// Reset

// Fork
// 71
// 72
// 73
// 74
// 75
// 76
// 77
// 78
// 79
// 80
// 81
// 82
// 83
// 84
// 85
// 86
// 87
// 88
// 89
// 90
// 91
// 92
// 93
// 94
// 95
// 96
// 97
// 98
// 99
// 100
// 101
// 102
// 103
// 104
// 105
// 106
// 107
// 108
// 109
// 110
// 111
// 112
// 113
// 114
// import { useState } from 'react';
//     if (move > 0) {
//       description = 'Go to move #' + move;
//     } else {
//       description = 'Go to game start';
//     }
//     return (
//       <li>
//         <button onClick={() => jumpTo(move)}>{description}</button>
//       </li>
//     );
//   });

//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
//       </div>
//       <div className="game-info">
//         <ol>{moves}</ol>
//       </div>
//     </div>
//   );
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }



// Console (1)

// Warning: Each child in a list should have a unique "key" prop.

// Check the render method of `Game`. See https://reactjs.org/link/warning-keys for more information.
//     at li
//     at Game (https://1e4ad8f7.sandpack-bundler-4bw.pages.dev/App.js:109:53)

// Show more
// As you iterate through history array inside the function you passed to map, the squares argument goes through each element of history, and the move argument goes through each array index: 0, 1, 2, …. (In most cases, you’d need the actual array elements, but to render a list of moves you will only need indexes.)

// For each move in the tic-tac-toe game’s history, you create a list item <li> which contains a button <button>. The button has an onClick handler which calls a function called jumpTo (that you haven’t implemented yet).

// For now, you should see a list of the moves that occurred in the game and an error in the developer tools console. Let’s discuss what the “key” error means.

// Picking a key 
// When you render a list, React stores some information about each rendered list item. When you update a list, React needs to determine what has changed. You could have added, removed, re-arranged, or updated the list’s items.

// Imagine transitioning from

// <li>Alexa: 7 tasks left</li>
// <li>Ben: 5 tasks left</li>
// to

// <li>Ben: 9 tasks left</li>
// <li>Claudia: 8 tasks left</li>
// <li>Alexa: 5 tasks left</li>
// In addition to the updated counts, a human reading this would probably say that you swapped Alexa and Ben’s ordering and inserted Claudia between Alexa and Ben. However, React is a computer program and can’t know what you intended, so you need to specify a key property for each list item to differentiate each list item from its siblings. If your data was from a database, Alexa, Ben, and Claudia’s database IDs could be used as keys.

// <li key={user.id}>
//   {user.name}: {user.taskCount} tasks left
// </li>
// When a list is re-rendered, React takes each list item’s key and searches the previous list’s items for a matching key. If the current list has a key that didn’t exist before, React creates a component. If the current list is missing a key that existed in the previous list, React destroys the previous component. If two keys match, the corresponding component is moved.

// Keys tell React about the identity of each component, which allows React to maintain state between re-renders. If a component’s key changes, the component will be destroyed and re-created with a new state.

// key is a special and reserved property in React. When an element is created, React extracts the key property and stores the key directly on the returned element. Even though key may look like it is passed as props, React automatically uses key to decide which components to update. There’s no way for a component to ask what key its parent specified.

// It’s strongly recommended that you assign proper keys whenever you build dynamic lists. If you don’t have an appropriate key, you may want to consider restructuring your data so that you do.

// If no key is specified, React will report an error and use the array index as a key by default. Using the array index as a key is problematic when trying to re-order a list’s items or inserting/removing list items. Explicitly passing key={i} silences the error but has the same problems as array indices and is not recommended in most cases.

// Keys do not need to be globally unique; they only need to be unique between components and their siblings.

// Implementing time travel 
// In the tic-tac-toe game’s history, each past move has a unique ID associated with it: it’s the sequential number of the move. Moves will never be re-ordered, deleted, or inserted in the middle, so it’s safe to use the move index as a key.

// In the Game function, you can add the key as <li key={move}>, and if you reload the rendered game, React’s “key” error should disappear:

// const moves = history.map((squares, move) => {
//   //...
//   return (
//     <li key={move}>
//       <button onClick={() => jumpTo(move)}>{description}</button>
//     </li>
//   );
// });

// App.js
// Download
// Reset

// Fork
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
// 22
// 23
// 24
// 25
// 26
// 27
// 28
// 29
// 30
// 31
// 32
// 33
// 34
// 35
// 36
// import { useState } from 'react';

// function Square({ value, onSquareClick }) {
//   return (
//     <button className="square" onClick={onSquareClick}>
//       {value}
//     </button>
//   );
// }

// function Board({ xIsNext, squares, onPlay }) {
//   function handleClick(i) {
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     const nextSquares = squares.slice();
//     if (xIsNext) {
//       nextSquares[i] = 'X';
//     } else {
//       nextSquares[i] = 'O';
//     }
//     onPlay(nextSquares);
//   }

//   const winner = calculateWinner(squares);
//   let status;
//   if (winner) {
//     status = 'Winner: ' + winner;
//   } else {
//     status = 'Next player: ' + (xIsNext ? 'X' : 'O');
//   }

//   return (
//     <>
//       <div className="status">{status}</div>
//       <div className="board-row">


// Show more
// Before you can implement jumpTo, you need the Game component to keep track of which step the user is currently viewing. To do this, define a new state variable called currentMove, defaulting to 0:

// export default function Game() {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const [currentMove, setCurrentMove] = useState(0);
//   const currentSquares = history[history.length - 1];
//   //...
// }
// Next, update the jumpTo function inside Game to update that currentMove. You’ll also set xIsNext to true if the number that you’re changing currentMove to is even.

// export default function Game() {
//   // ...
//   function jumpTo(nextMove) {
//     setCurrentMove(nextMove);
//     setXIsNext(nextMove % 2 === 0);
//   }
//   //...
// }
// You will now make two changes to the Game’s handlePlay function which is called when you click on a square.

// If you “go back in time” and then make a new move from that point, you only want to keep the history up to that point. Instead of adding nextSquares after all items (... spread syntax) in history, you’ll add it after all items in history.slice(0, currentMove + 1) so that you’re only keeping that portion of the old history.
// Each time a move is made, you need to update currentMove to point to the latest history entry.
// function handlePlay(nextSquares) {
//   const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
//   setHistory(nextHistory);
//   setCurrentMove(nextHistory.length - 1);
//   setXIsNext(!xIsNext);
// }
// Finally, you will modify the Game component to render the currently selected move, instead of always rendering the final move:

// export default function Game() {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const [currentMove, setCurrentMove] = useState(0);
//   const currentSquares = history[currentMove];

//   // ...
// }
// If you click on any step in the game’s history, the tic-tac-toe board should immediately update to show what the board looked like after that step occurred.


// App.js
// Download
// Reset

// Fork
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
// 22
// 23
// 24
// 25
// 26
// 27
// 28
// 29
// 30
// 31
// 32
// 33
// 34
// 35
// 36
// import { useState } from 'react';

// function Square({value, onSquareClick}) {
//   return (
//     <button className="square" onClick={onSquareClick}>
//       {value}
//     </button>
//   );
// }

// function Board({ xIsNext, squares, onPlay }) {
//   function handleClick(i) {
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     const nextSquares = squares.slice();
//     if (xIsNext) {
//       nextSquares[i] = 'X';
//     } else {
//       nextSquares[i] = 'O';
//     }
//     onPlay(nextSquares);
//   }

//   const winner = calculateWinner(squares);
//   let status;
//   if (winner) {
//     status = 'Winner: ' + winner;
//   } else {
//     status = 'Next player: ' + (xIsNext ? 'X' : 'O');
//   }

//   return (
//     <>
//       <div className="status">{status}</div>
//       <div className="board-row">


// Show more
// Final cleanup 
// If you look at the code very closely, you may notice that xIsNext === true when currentMove is even and xIsNext === false when currentMove is odd. In other words, if you know the value of currentMove, then you can always figure out what xIsNext should be.

// There’s no reason for you to store both of these in state. In fact, always try to avoid redundant state. Simplifying what you store in state reduces bugs and makes your code easier to understand. Change Game so that it doesn’t store xIsNext as a separate state variable and instead figures it out based on the currentMove:

// export default function Game() {
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const [currentMove, setCurrentMove] = useState(0);
//   const xIsNext = currentMove % 2 === 0;
//   const currentSquares = history[currentMove];

//   function handlePlay(nextSquares) {
//     const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
//     setHistory(nextHistory);
//     setCurrentMove(nextHistory.length - 1);
//   }

//   function jumpTo(nextMove) {
//     setCurrentMove(nextMove);
//   }
//   // ...
// }
// You no longer need the xIsNext state declaration or the calls to setXIsNext. Now, there’s no chance for xIsNext to get out of sync with currentMove, even if you make a mistake while coding the components.

// Wrapping up 
// Congratulations! You’ve created a tic-tac-toe game that:

// Lets you play tic-tac-toe,
// Indicates when a player has won the game,
// Stores a game’s history as a game progresses,
// Allows players to review a game’s history and see previous versions of a game’s board.
// Nice work! We hope you now feel like you have a decent grasp of how React works.

// Check out the final result here:


// App.js
// Download
// Reset

// Fork
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
// 22
// 23
// 24
// 25
// 26
// 27
// 28
// 29
// 30
// 31
// 32
// 33
// 34
// 35
// 36
// import { useState } from 'react';

// function Square({ value, onSquareClick }) {
//   return (
//     <button className="square" onClick={onSquareClick}>
//       {value}
//     </button>
//   );
// }

// function Board({ xIsNext, squares, onPlay }) {
//   function handleClick(i) {
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     const nextSquares = squares.slice();
//     if (xIsNext) {
//       nextSquares[i] = 'X';
//     } else {
//       nextSquares[i] = 'O';
//     }
//     onPlay(nextSquares);
//   }

//   const winner = calculateWinner(squares);
//   let status;
//   if (winner) {
//     status = 'Winner: ' + winner;
//   } else {
//     status = 'Next player: ' + (xIsNext ? 'X' : 'O');
//   }

//   return (
//     <>
//       <div className="status">{status}</div>
//       <div className="board-row">


// Show more
// If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game, listed in order of increasing difficulty:

// For the current move only, show “You are at move #…” instead of a button.
// Rewrite Board to use two loops to make the squares instead of hardcoding them.
// Add a toggle button that lets you sort the moves in either ascending or descending order.
// When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
// Display the location for each move in the format (row, col) in the move history list.
// Throughout this tutorial, you’ve touched on React concepts including elements, components, props, and state. Now that you’ve seen how these concepts work when building a game, check out Thinking in React to see how the same React concepts work when build an app’s UI.