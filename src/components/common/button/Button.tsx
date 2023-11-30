

interface ButtonProps {
  children?: string
  classButton?: string
  idButton?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button({ children, classButton, idButton, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} id={idButton} className={`btn ${classButton}`}>
      {children}
    </button>
  )
}

export default Button
