import React from 'react';
import { useState } from "react";
import Board from "./components/board";
import "./styles.css";

export default function App() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Todo",
      items: [
        { id: 1, title: "task #1" },
        { id: 2, title: "task #2" },
        { id: 3, title: "task #3" }
      ]
    },
    {
      id: 2,
      title: "In progress",
      items: [
        { id: 4, title: "task #4" },
        { id: 5, title: "task #5" },
        { id: 6, title: "task #6" }
      ]
    },
    {
      id: 3,
      title: "Done",
      items: [
        { id: 7, title: "task #7" },
        { id: 8, title: "task #8" },
        { id: 9, title: "task #9" }
      ]
    }
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  return (
    <div className="app">
      <header className="app__header">
        <h2>Board</h2>
      </header>
      <main className="app__main">
        {boards.map((board) => {
          return (
            <Board
              key={board.id}
              boards={boards}
              setBoards={setBoards}
              board={board}
              setCurrentBoard={setCurrentBoard}
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
              currentBoard={currentBoard}
            />
          );
        })}
      </main>
    </div>
  );
}
