import { MODAL_TITLE } from "constants/common"
import { defaultData } from "constants/food"
import { Food } from "interfaces/product/Product"

export interface ModalProps {
  isShowUp: boolean
  title: string
}

export enum MODAL_ACTION {
  CONFIRM = 'CONFIRM',
  MUTATION = 'MUTATION',
  LOADING = 'LOADING'
}

export interface ModalState {
  mutationModal: ModalProps & {
    productData?: Food
  }
}

export interface ModalAction {
  type: MODAL_ACTION,
  payload: {
    isShowUp: boolean;
    title?: string
    productData?: Food
    dataId?: string
  }
}

export const initialModalState: ModalState = {
  mutationModal: {
    isShowUp: false,
    title: MODAL_TITLE.ADD,
    productData: defaultData
  }
}

export const modalReducer = (state: ModalState, action: ModalAction) => {
  const { type, payload } = action

  switch (type) {
    case MODAL_ACTION.MUTATION:
      return {
        ...state,
        mutationModal: {
          isShowUp: payload.isShowUp,
          title: payload.title ?? state.mutationModal.title,
          productData: payload.productData ?? state.mutationModal.productData
        }
      }
    default:
      return state
  }
}
