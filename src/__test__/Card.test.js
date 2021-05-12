import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Card from "../components/card";

test("Test Card component props update", () => {
  let wrapper;
  const setCurrentBoard = jest.fn();
  const setCurrentItem = jest.fn();
  const setIsSelected = jest.fn();
  const setBoards = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setCurrentBoard]);
  const { debug, rerender, container } = render(
    <Card item={{ id: 7, title: "task #7" }} />
  );
  expect(screen.getByText(/task #7/i)).toHaveTextContent(/task #7/i);
  rerender(
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
  expect(screen.getByText(/task #8/i)).toHaveTextContent(/task #8/i);

  const card = screen.getByText(/task #8/i);
  debug(card);
  expect(card).not.toHaveClass("list__item_selected");

  fireEvent.dragStart(card);
  expect(setCurrentBoard).toHaveBeenCalledTimes(1);
  expect(setCurrentItem).toHaveBeenCalledTimes(1);

  fireEvent.dragOver(card);
  debug(card);

  expect(card).toHaveClass("list__item_selected");

  fireEvent.dragLeave(card);
  debug(card);
  expect(card).not.toHaveClass("list__item_selected");

  fireEvent.drop(card);
});
