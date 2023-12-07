// library
import { useReducer } from 'react';
// Store
import { TOAST_ACTION, ToastType, initialToastState, toastReducer } from 'store/Toast';

function useToast() {
  const [toast, dispatch] = useReducer(toastReducer, initialToastState)

  const { message, toastType, isVisible } = toast

  const showToast = (message: string, toastType: ToastType) => {
    dispatch({
      type: TOAST_ACTION.TOAST,
      payload: {
        message,
        toastType,
        isVisible: true
      }
    })
  }

  const hideToast = () => {
    setTimeout(() => {
      dispatch({
        type: TOAST_ACTION.TOAST,
        payload: {
          toastType,
          isVisible: false
        }
      })
    }, 2500)
  }

  return {
    toast: {
      message,
      toastType,
      isVisible
    },
    showToast,
    hideToast
  }
}

export default useToast
