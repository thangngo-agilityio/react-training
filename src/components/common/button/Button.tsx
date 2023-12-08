import { ReactNode } from 'react';

// Set type
type ButtonProps = {
  children: ReactNode
  classButton?: string
  idButton?: string
  dataId?: string
  type?: 'submit' | 'button',
  isDisabled?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Button = ({ children, classButton, idButton, dataId, type, isDisabled = false, onClick }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} id={idButton} className={classButton} data-id={dataId} disabled={isDisabled}>
      {children}
    </button>
  )
}

export default Button
