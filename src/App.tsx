import { useCallback, useEffect, useMemo, useState } from 'react'
import Board from './components/Board'
import Square from './components/Square'
import { SquareValue } from './types'
import './App.css'

type BoardStatus = SquareValue[][]

function selectNextBoard(boardStatus: BoardStatus, clickedSquareIndex: number) {
  if (boardStatus[clickedSquareIndex].every(Boolean) || checkWinnerSingleBoard(boardStatus[clickedSquareIndex])) {
    return null
  }
  return clickedSquareIndex
}

const winningLines = [
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
]

function checkWinnerSingleBoard(singleBoardStatus: SquareValue[]) {
  for (const line of winningLines) {
    const [a, b, c] = line
    if (singleBoardStatus[a] && singleBoardStatus[a] === singleBoardStatus[b] && singleBoardStatus[a] === singleBoardStatus[c]) {
      return singleBoardStatus[a]
    }
  }

  return null
}

function App() {

  const [boardStatus, setBoardStatus] = useState<BoardStatus>(Array(9).fill(Array(9).fill(null)))
  const [currentPlayer, setCurrentPlayer] = useState<SquareValue>('❌')
  const [currentBoard, setCurrentBoard] = useState<number | null>(null)
  const [winningStatus, setWinningStatus] = useState<Array<SquareValue | null>>(Array(9).fill(null))
  const [winner, setWinner] = useState<SquareValue | null>(null)

  useEffect(() => {
    // check for ultimate winner
    for (const line of winningLines) {
      const [a, b, c] = line
      if (winningStatus[a] && winningStatus[a] === winningStatus[b] && winningStatus[a] === winningStatus[c]) {
        setWinner(winningStatus[a])
        return
      }
    }
  }, [winningStatus])

  const handleSquareClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const { index } = e.currentTarget.dataset
    const [boardIndex, squareIndex] = index!.split('-').map(Number)

    const newBoardStatus = boardStatus.map((board, i) => {
      if (i === boardIndex) {
        return board.map((value, j) => {
          if (j === squareIndex) {
            return currentPlayer
          }
          return value
        })
      }
      return board
    })

    if (checkWinnerSingleBoard(newBoardStatus[boardIndex])) {
      setWinningStatus(winner => {
        const newWinner = [...winner]
        newWinner[boardIndex] = currentPlayer
        return newWinner
      })
    }

    setCurrentBoard(selectNextBoard(newBoardStatus, squareIndex))
    setBoardStatus(newBoardStatus)
    setCurrentPlayer(currentPlayer === '❌' ? '⭕️' : '❌')
  }, [boardStatus, currentPlayer])

  return (
    <>
      <h1>Ultimate Tic-Tac-Toe</h1>

      <div>
        <p>Current player: {currentPlayer}</p>
      </div>

      <Board
        value={winner}
      >
        {boardStatus.map((board, boardIndex) =>
          <Board
            key={boardIndex}
            value={winningStatus[boardIndex]}
            disabled={winner !== null}
          >
            {board.map((value, index) =>
              <Square
                key={index}
                index={`${boardIndex}-${index}`}
                value={value}
                onClick={handleSquareClick}
                disabled={currentBoard !== null && currentBoard !== boardIndex || value !== null || winningStatus[boardIndex] !== null || winner !== null}
              />
            )}
          </Board>
        )}
      </Board>
    </>
  )
}

export default App