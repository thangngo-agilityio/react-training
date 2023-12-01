import { Food } from "interfaces/product/Product";
import { useCallback, useReducer } from "react";
import { MODAL_ACTION, initialModalState, modalReducer } from "store/modal";

function useModal() {
  const [{ mutationModal }, dispatch] = useReducer(modalReducer, initialModalState)

  const setMutationShowUp = useCallback(
    (isShowUp: boolean, title?: string, productData?: Food) => {
      dispatch({
        type: MODAL_ACTION.MUTATION,
        payload: {
          isShowUp,
          title,
          productData
        }
      });
    },
    [dispatch]
  );

  return {
    setMutationShowUp,
    mutationModal,
  }
}

export default useModal
