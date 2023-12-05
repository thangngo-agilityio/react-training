// library
import { useReducer, useMemo, useCallback } from 'react';
// Store
import { TOAST_ACTION, ToastType, initialToastState, toastReducer } from 'store/Toast';

function useToast() {
  const [toast, dispatch] = useReducer(toastReducer, initialToastState)

  const { message, toastType, isVisible } = useMemo(() => toast, [toast])

  const showToast = useCallback((message: string, toastType: ToastType) => {
    dispatch({
      type: TOAST_ACTION.TOAST,
      payload: {
        message,
        toastType,
        isVisible: true
      }
    })
  }, [dispatch])

  const hideToast = useCallback(() => {
    setTimeout(() => {
      dispatch({
        type: TOAST_ACTION.TOAST,
        payload: {
          toastType,
          isVisible: false
        }
      })
    }, 2500)
  }, [dispatch, toastType])

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
