import { Children } from "react"
import { SquareValue } from "../../types"
import styles from "./Board.module.css"

interface BoardComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  // index?: number
  value?: SquareValue | null
  disabled?: boolean
}

export default function BoardComponent({
  // index,
  value,
  disabled,
  children = Array(9).fill(null),
}: BoardComponentProps) {

  return (
    <div className={styles.board} data-disabled={disabled}>
      {Children.map(children, (child) => {
        return child
      })}
      {value &&
        <svg className={styles.winner} viewBox="0 0 100 100">
          <text x="50%" y="50%">{value}</text>
        </svg>
      }
    </div>
  )
}
