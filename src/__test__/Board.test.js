import React from "react"
import {render,screen} from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import Board from "../components/board"

test('Board', () => {
  const boards=[
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
  ];
  const {debug, rerender} = render(<Board board={boards[2]} />)
  expect(screen.getByText(/Done/i)).toHaveTextContent(/Done/i)

  
})