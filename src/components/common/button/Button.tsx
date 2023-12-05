import { ReactElement } from "react"


interface ButtonProps {
  children?: string | ReactElement
  classButton?: string
  idButton?: string
  dataId?: string
  type?: 'submit' | 'button'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button({ children, classButton, idButton, dataId, type, onClick }: ButtonProps) {
  return (
    <>
      <button type={type} onClick={onClick} id={idButton} className={classButton} data-id={dataId}>
        {children}
      </button>
    </>
  )
}

export default Button
