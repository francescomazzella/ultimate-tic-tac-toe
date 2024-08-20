import { SquareValue } from '../../types'
import styles from './Square.module.css'

interface SquareComponentProps extends React.HTMLAttributes<HTMLButtonElement> {
  index: string
  value: SquareValue | null
  disabled?: boolean
}

export default function SquareComponent({
  index,
  value,
  disabled,
  onClick,
}: SquareComponentProps) {
  return <button
    data-index={index}
    data-value={value}
    className={styles.square}
    onClick={onClick}
    disabled={disabled}
  >{value}</button>
}
