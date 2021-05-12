import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Board from "../components/board";
import App from "../App";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

test("App", () => {
  const boards = [
    {
      id: 1,
      title: "Todo",
      items: [
        { id: 1, title: "task #1" },
        { id: 2, title: "task #2" },
        { id: 3, title: "task #3" },
      ],
    },
    {
      id: 2,
      title: "In progress",
      items: [
        { id: 4, title: "task #4" },
        { id: 5, title: "task #5" },
        { id: 6, title: "task #6" },
      ],
    },
    {
      id: 3,
      title: "Done",
      items: [
        { id: 7, title: "task #7" },
        { id: 8, title: "task #8" },
        { id: 9, title: "task #9" },
      ],
    },
  ];
  const { debug, rerender, container } = render(<App />);
  expect(screen.getByText(/Done/i)).toHaveTextContent(/Done/i);
  let dropZone = screen.getByText(/in progress/i);
  let dragElement = screen.getByText(/task #1/i);
  let boardInProgress = screen.getByText(/in progress/i);

  fireEvent.dragStart(dragElement);
  fireEvent.dragEnter(dropZone);
  fireEvent.dragOver(dropZone);

  fireEvent.dragLeave(dropZone);
  fireEvent.dragEnd(dragElement);
  fireEvent.drop(dropZone);

  dropZone = screen.getByText(/in progress/i);
  dragElement = screen.getByText(/task #7/i);

  fireEvent.dragStart(dragElement);
  fireEvent.dragEnter(dropZone);
  fireEvent.dragOver(dropZone);

  fireEvent.dragLeave(dropZone);
  fireEvent.dragEnd(dragElement);
  fireEvent.drop(dropZone);

  screen.debug(boardInProgress);

  const list = dropZone.lastChild;
  const lastInTheList = list.lastChild;

  expect(lastInTheList).toHaveTextContent("task #7");
  expect(list.childNodes.length).toBe(5);
});
