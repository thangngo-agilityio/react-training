// Library
import { createContext, ReactNode, useMemo } from 'react';
// Store
import { ToastType } from 'store/Toast'
// Custom hooks
import useToast from '@components/hooks/useToast'

interface ToastContextProps {
  toast: {
    message: string,
    toastType: ToastType,
    isVisible: boolean
  }
  showToast: (message: string, toastType: ToastType) => void
  hideToast: () => void
}

export const ToastContext = createContext<ToastContextProps>({
  toast: {
    message: '',
    toastType: ToastType.SUCCESS,
    isVisible: false
  },
  showToast: () => { },
  hideToast: () => { }
})

interface ToastContextProviderProps {
  children: ReactNode
}

export const ToastContextProvider = (({ children }: ToastContextProviderProps) => {
  const { toast, showToast, hideToast } = useToast()

  const toastContextValue = useMemo(() => ({
    toast, showToast, hideToast
  }), [toast, showToast, hideToast])

  return (
    <ToastContext.Provider value={toastContextValue}>
      {children}
    </ToastContext.Provider>
  )
})
