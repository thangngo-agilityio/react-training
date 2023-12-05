
export enum ToastType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export enum TOAST_ACTION {
  TOAST = 'TOAST'
}

export interface ToastAction {
  type: TOAST_ACTION,
  payload: {
    message?: string;
    toastType: ToastType;
    isVisible: boolean
  }
}

export interface ToastState {
  message: string,
  toastType: ToastType,
  isVisible: boolean
}

export const initialToastState: ToastState = {
  message: '',
  toastType: ToastType.SUCCESS,
  isVisible: false
}

export const toastReducer = ((state: ToastState, action: ToastAction) => {
  const { type, payload } = action
  switch (type) {
    case TOAST_ACTION.TOAST:
      return {
        ...state,
        message: payload.message ?? state.message,
        toastType: payload.toastType ?? state.toastType,
        isVisible: payload.isVisible
      };
    default:
      return state;
  }
})
