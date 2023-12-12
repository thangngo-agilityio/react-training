// library
import { useState } from 'react';

export enum ToastType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

const useToast = () => {
  const [message, setMessage] = useState('');
  const [toastType, setToastType] = useState(ToastType.SUCCESS);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = (message: string, toastType: ToastType) => {
    setMessage(message);
    setIsVisible(true);
    setToastType(toastType);
  };

  const hideToast = () => {
    setTimeout(() => {
      setIsVisible(false);
      toastType;
    }, 2500);
  };

  return {
    toast: {
      message,
      toastType,
      isVisible
    },
    showToast,
    hideToast
  };
};

export default useToast;
