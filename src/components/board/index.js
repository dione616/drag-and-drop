import React from 'react';
import { useState } from "react";
import CardsList from "../cardsList/index";
import styles from "./board.module.css";

const Board = ({
  boards,
  setBoards,
  board,
  setCurrentBoard,
  currentItem,
  setCurrentItem,
  currentBoard
}) => {
  const [isSelected, setIsSelected] = useState(null);

  const dragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (e, board) => {
    if (!board.items.length || !isSelected) {
      board.items.push(currentItem);
      const currentIndex = currentBoard.items.indexOf(currentItem);
      currentBoard.items.splice(currentIndex, 1);

      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return board;
          }
          if (b.id === currentBoard.id) {
            return currentBoard;
          }
          return b;
        })
      );
    }
  };
  return (
    <div
      onDragOver={(e) => dragOver(e)}
      onDrop={(e) => onDrop(e, board)}
      className={styles.list}
    >
      <h3>{board.title}</h3>
      <CardsList
        boards={boards}
        setBoards={setBoards}
        board={board}
        setCurrentBoard={setCurrentBoard}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        currentBoard={currentBoard}
        setIsSelected={setIsSelected}
      />
    </div>
  );
};

export default Board;
