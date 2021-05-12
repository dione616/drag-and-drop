import React,{ useState } from "react";
import styles from "./card.module.css";

const Card = ({
  item,
  boards,
  setBoards,
  board,
  setCurrentBoard,
  currentItem,
  setCurrentItem,
  currentBoard,
  setIsSelected
}) => {
  const [selected, setSelected] = useState(false);
  const dragOverHandler = (e) => {
    e.preventDefault();

    setSelected(true);
    setIsSelected(true);
  };
  const dragLeaveHandler = (e) => {
    setSelected(false);
    setIsSelected(false);
  };
  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };
  const dragEndHandler = (e) => {
    setSelected(false);
    setIsSelected(false);
  };
  const dropHandler = (e, board, item) => {
    e.preventDefault();
    const currentItemIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentItemIndex, 1);

    const dropIndexItem = board.items.indexOf(item);
    board.items.splice(dropIndexItem, 0, currentItem); //put before highlighed task

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
    setSelected(false);
    setIsSelected(false);
  };

  return (
    <div
      key={item.id}
      className={`${styles.list__item} ${
        selected ? styles.list__item_selected : null
      }`}
      draggable
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDragStart={(e) => dragStartHandler(e, board, item)}
      onDragEnd={dragEndHandler}
      onDrop={(e) => dropHandler(e, board, item)}
    >
      {item.title}
    </div>
  );
};

export default Card;
