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
};

export const ToastContext = createContext<ToastContextProps>({
  toast: {
    message: '',
    toastType: ToastType.SUCCESS,
    isVisible: false
  },
  showToast: () => {}
});

type ToastContextProviderProps = {
  children: ReactNode;
};

export const ToastContextProvider = ({ children }: ToastContextProviderProps) => {
  const { toast, showToast } = useToast();

  const toastContextValue = {
    toast,
    showToast
  };

  return <ToastContext.Provider value={toastContextValue}>{children}</ToastContext.Provider>;
};
