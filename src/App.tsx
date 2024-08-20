import { useCallback, useEffect, useState } from 'react'
import Board from './components/Board'
import Square from './components/Square'
import { checkBoardWinner, selectNextBoard, winningLines } from './utils'
import { SquareValue, UltimateBoardStatus } from './types'
import './App.css'

function App() {

  const [boardStatus, setBoardStatus] = useState<UltimateBoardStatus>(Array(9).fill(Array(9).fill(null)))
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
        setCurrentPlayer(null)
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

    if (checkBoardWinner(newBoardStatus[boardIndex])) {
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

      <div className='toolbar'>
        <button
          onClick={() => {
            setBoardStatus(Array(9).fill(Array(9).fill(null)))
            setCurrentPlayer('❌')
            setCurrentBoard(null)
            setWinningStatus(Array(9).fill(null))
            setWinner(null)
          }}
        >Reset 🔄️</button>
        {currentPlayer && <span>Current player: {currentPlayer}</span>}
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
