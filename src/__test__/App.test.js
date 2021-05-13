import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

test("test drop to another list", () => {
  render(<App />);
  expect(screen.getByText(/Done/i)).toHaveTextContent(/Done/i);
  let dropZone = screen.getByText(/in progress/i);
  let dragElement = screen.getByText(/task #1/i);

  fireEvent.dragStart(dragElement);
  fireEvent.dragEnter(dropZone);
  fireEvent.dragOver(dropZone);

  fireEvent.dragLeave(dropZone);
  fireEvent.dragEnd(dragElement);
  fireEvent.drop(dropZone);
  

  const list = dropZone.lastChild;
  const lastInTheList = list.lastChild;

  expect(lastInTheList).toHaveTextContent("task #1");
});

test("return back to list Todo", () => {
  render(<App />);

  const dropZone = screen.getByText(/todo/i);
  const dragElement = screen.getByText(/task #1/i);

  fireEvent.dragStart(dragElement);
  fireEvent.dragEnter(dropZone);
  fireEvent.dragOver(dropZone);

  fireEvent.dragLeave(dropZone);
  fireEvent.dragEnd(dragElement);
  fireEvent.drop(dropZone);
  

  const list = dropZone.lastChild;
  const lastInTheList = list.lastChild;

  expect(lastInTheList).toHaveTextContent("task #1");
});

test("drop outside of the list", () => {
  render(<App />);

  const dropZone = screen.getByText(/board/i);
  const dragElement = screen.getByText(/task #1/i);

  fireEvent.dragStart(dragElement);
  fireEvent.dragEnter(dropZone);
  fireEvent.dragOver(dropZone);

  fireEvent.dragLeave(dropZone);
  fireEvent.dragEnd(dragElement);
  fireEvent.drop(dropZone);
  

  const list = screen.getByText(/todo/i).lastChild;
  const lastInTheList = list.lastChild;
  
  expect(lastInTheList).toHaveTextContent("task #3")
});