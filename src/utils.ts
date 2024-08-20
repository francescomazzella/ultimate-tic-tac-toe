import { SquareValue, UltimateBoardStatus } from "./types"

export function selectNextBoard(boardStatus: UltimateBoardStatus, clickedSquareIndex: number) {
  if (boardStatus[clickedSquareIndex].every(Boolean) || checkBoardWinner(boardStatus[clickedSquareIndex])) {
    return null
  }
  return clickedSquareIndex
}

export const winningLines = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonals
  [0, 4, 8],
  [2, 4, 6],
] as const

export function checkBoardWinner(singleBoardStatus: SquareValue[]) {
  for (const line of winningLines) {
    const [a, b, c] = line
    if (singleBoardStatus[a] && singleBoardStatus[a] === singleBoardStatus[b] && singleBoardStatus[a] === singleBoardStatus[c]) {
      return singleBoardStatus[a]
    }
  }

  return null
}
