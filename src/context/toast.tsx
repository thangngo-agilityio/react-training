// Library
import { createContext, ReactNode } from 'react';
// Custom hooks
import useToast, { ToastType } from 'hooks/useToast';

type ToastContextProps = {
  toast: {
    message: string;
    toastType: ToastType;
    isVisible: boolean;
  };
  showToast: (message: string, toastType: ToastType) => void;
  hideToast: () => void;
};

export const ToastContext = createContext<ToastContextProps>({
  toast: {
    message: '',
    toastType: ToastType.SUCCESS,
    isVisible: false
  },
  showToast: () => {},
  hideToast: () => {}
});

type ToastContextProviderProps = {
  children: ReactNode;
};

export const ToastContextProvider = ({ children }: ToastContextProviderProps) => {
  const { toast, showToast, hideToast } = useToast();

  const toastContextValue = {
    toast,
    showToast,
    hideToast
  };

  return <ToastContext.Provider value={toastContextValue}>{children}</ToastContext.Provider>;
};
