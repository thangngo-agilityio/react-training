import { Product } from 'interfaces/product/Product';
import { useCallback, useReducer } from 'react';
import { MODAL_ACTION, initialModalState, modalReducer } from 'store/modal';

function useModal() {
  const [{ mutationModal, loadingShowUp, confirmModal }, dispatch] = useReducer(
    modalReducer,
    initialModalState
  );

  const setMutationShowUp = useCallback(
    (isShowUp: boolean, title?: string, productData?: Product) => {
      dispatch({
        type: MODAL_ACTION.MUTATION,
        payload: {
          isShowUp,
          title,
          productData,
        },
      });
    },
    [dispatch]
  );

  const setLoadingShowUp = useCallback(
    (isShowUp: boolean) => {
      dispatch({
        type: MODAL_ACTION.LOADING,
        payload: { isShowUp },
      });
    },
    [dispatch]
  );

  const setConfirmShowup = useCallback((isShowUp: boolean, dataId?: string) => {
    dispatch({
      type: MODAL_ACTION.CONFIRM,
      payload: {
        isShowUp,
        dataId
      }
    })
  }, [dispatch])

  return {
    setMutationShowUp,
    mutationModal,
    setLoadingShowUp,
    loadingShowUp,
    confirmModal,
    setConfirmShowup
  };
}

export default useModal;
