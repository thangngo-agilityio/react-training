import { ReactNode } from 'react';

interface ButtonProps {
  children?: ReactNode
  classButton?: string
  idButton?: string
  dataId?: string
  type?: 'submit' | 'button',
  isVisible?: boolean
  isDisabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button({ children, classButton, idButton, dataId, type, isVisible = true, isDisabled = false, onClick }: ButtonProps) {
  return (
    <>
      {isVisible && (
        <button type={type} onClick={onClick} id={idButton} className={classButton} data-id={dataId} disabled={isDisabled}>
          {children}
        </button>
      )}
    </>
  )
}

export default Button
