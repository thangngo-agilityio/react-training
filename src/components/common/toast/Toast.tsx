// Library
import { useMemo, memo } from 'react';
// Store
import { ToastType } from "store/Toast"
// Icon image
import errorIcon from '../../../assets/icon/icon_error.svg'
import successIcon from '../../../assets/icon/icon_check.svg'

interface ToastProps {
  message: string
  isShow?: boolean
  toastType: ToastType
}

function Toast({ message, isShow, toastType }: ToastProps) {
  const toastTypeClass = useMemo(() => toastType.toLowerCase(), [toastType])

  const toastIcon = useMemo(() => {
    if (toastType === ToastType.ERROR) {
      return errorIcon
    } else {
      return successIcon
    }
  }, [toastType])

  return (
    <div style={{ visibility: isShow ? 'visible' : 'hidden', opacity: isShow ? '1' : '0' }} className={`toast ${toastTypeClass}`}>
      <div className="toast-body">
        <img src={toastIcon} alt="icon toast" className='toast-icon' />
        <p className="toast-message">{message}</p>
      </div>
    </div>
  )
}

export default memo(Toast)
