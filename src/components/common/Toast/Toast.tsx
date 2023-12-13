import { ToastType } from 'hooks/useToast';
// Icon image
import errorIcon from '../../../assets/icon/icon_error.svg';
import successIcon from '../../../assets/icon/icon_check.svg';
// Css
import './toast.css';

type ToastProps = {
  message: string;
  isShow?: boolean;
  toastType: ToastType;
};

const Toast = ({ message, isShow, toastType }: ToastProps) => {
  return (
    <div
      style={{ visibility: isShow ? 'visible' : 'hidden', opacity: isShow ? '1' : '0' }}
      className={`toast ${toastType.toLowerCase()}`}
    >
      <div className="toast-body">
        <img
          src={toastType === ToastType.ERROR ? errorIcon : successIcon}
          alt="icon toast"
          className="toast-icon"
        />
        <p className="toast-message">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
