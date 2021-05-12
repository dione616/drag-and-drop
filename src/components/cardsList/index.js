import React from 'react';
import Card from "../card";

const CardsList = ({
  boards,
  setBoards,
  board,
  setCurrentBoard,
  currentItem,
  setCurrentItem,
  currentBoard,
  setIsSelected
}) => {
  return (
    <div className="list__items">
      {board.items.map((item) => (
        <Card
          key={item.id}
          item={item}
          boards={boards}
          setBoards={setBoards}
          board={board}
          setCurrentBoard={setCurrentBoard}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          currentBoard={currentBoard}
          setIsSelected={setIsSelected}
        />
      ))}
    </div>
  );
};

export default CardsList;
