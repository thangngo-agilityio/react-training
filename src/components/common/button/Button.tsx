import { ReactElement } from "react"


interface ButtonProps {
  children?: string | ReactElement
  classButton?: string
  idButton?: string
  dataId?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button({ children, classButton, idButton, dataId, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} id={idButton} className={classButton} data-id={dataId}>
      {children}
    </button>
  )
}

export default Button
