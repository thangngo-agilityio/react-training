import { MODAL_TITLE } from 'constants/common';
import { defaultData } from 'constants/food';
import { Product } from 'interfaces/product/Product';

export interface ModalProps {
  isShowUp: boolean;
  title: string;
}

export enum MODAL_ACTION {
  CONFIRM = 'CONFIRM',
  MUTATION = 'MUTATION',
  LOADING = 'LOADING',
}

export interface ModalState {
  mutationModal: ModalProps & {
    productData?: Product;
  };

  loadingShowUp: boolean;
}

export interface ModalAction {
  type: MODAL_ACTION;
  payload: {
    isShowUp: boolean;
    title?: string;
    productData?: Product;
    dataId?: string;
  };
}

export const initialModalState: ModalState = {
  mutationModal: {
    isShowUp: false,
    title: MODAL_TITLE.ADD,
    productData: defaultData,
  },

  loadingShowUp: false,
};

export const modalReducer = (state: ModalState, action: ModalAction) => {
  const { type, payload } = action;

  switch (type) {
    case MODAL_ACTION.MUTATION:
      return {
        ...state,
        mutationModal: {
          isShowUp: payload.isShowUp,
          title: payload.title ?? state.mutationModal.title,
          productData: payload.productData ?? state.mutationModal.productData,
        },
      };
    case MODAL_ACTION.LOADING:
      return {
        ...state,
        loadingShowUp: payload.isShowUp,
      };
    default:
      return state;
  }
};
