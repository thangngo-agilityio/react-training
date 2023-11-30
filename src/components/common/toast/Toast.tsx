
interface ToastProps {
  message: string
}

function Toast({ message }: ToastProps) {
  return (
    <div className="toast">
      <div className="toast-body">
        <p className="toast-message">{message}</p>
      </div>
    </div>
  )
}

export default Toast
