import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "../components/card";

const setCurrentBoard = jest.fn();
const setCurrentItem = jest.fn();
const setIsSelected = jest.fn();
const setBoards = jest.fn();

const component = () => {
  return (
    <Card
      item={{ id: 8, title: "task #8" }}
      setBoards={setBoards}
      setCurrentBoard={setCurrentBoard}
      setCurrentItem={setCurrentItem}
      setIsSelected={setIsSelected}
      currentBoard={{
        id: 3,
        title: "Done",
        items: [
          { id: 7, title: "task #7" },
          { id: 8, title: "task #8" },
          { id: 9, title: "task #9" },
        ],
      }}
      board={{
        id: 3,
        title: "Done",
        items: [
          { id: 7, title: "task #7" },
          { id: 8, title: "task #8" },
          { id: 9, title: "task #9" },
        ],
      }}
      boards={[
        {
          id: 3,
          title: "Done",
          items: [
            { id: 7, title: "task #7" },
            { id: 8, title: "task #8" },
            { id: 9, title: "task #9" },
          ],
        },
      ]}
    />
  );
};

test("test card is selected after drag", () => {
  render(component());

  const card = screen.getByRole("tab", { selected: false });

  fireEvent.dragStart(card);
  fireEvent.dragOver(card);

  expect(screen.queryByRole("tab", { selected: true })).toBeInTheDocument();

  fireEvent.drop(card);
  expect(screen.queryByRole("tab", { selected: true })).not.toBeInTheDocument();
});

test("test multiple setState calls", () => {
  render(component());
  expect(setCurrentBoard).toHaveBeenCalledTimes(1);
  expect(setCurrentItem).toHaveBeenCalledTimes(1);
  expect(setBoards).toHaveBeenCalledTimes(1);
});

test("test card is not selected after drop", () => {
  render(component());

  const card = screen.getByRole("tab", { selected: false });

  fireEvent.dragStart(card);
  fireEvent.dragOver(card);
  fireEvent.drop(card);

  expect(screen.queryByRole("tab", { selected: true })).not.toBeInTheDocument();
});
