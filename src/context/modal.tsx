import { ReactNode, createContext, useMemo } from "react";
import { defaultData } from "constants/food";
import { ModalProps } from "store/modal";
import { Product } from "interfaces/product/Product";
import useModal from "@components/hooks/useModal";
import { MODAL_TITLE } from "constants/common";

interface ModalContextProps {
  mutationModal: ModalProps & {
    productData?: Product
  }
  setMutationShowUp: (
    isShowUp: boolean,
    title?: string,
    productData?: Product
  ) => void
  loadingShowUp: boolean
  setLoadingShowUp: (isShowUp: boolean) => void
  confirmModal: {
    isShowUp: boolean
    dataId: string
  }
  setConfirmShowup: (
    isShowUp: boolean,
    dataId?: string
  ) => void
}

interface ModalContextProviderProps {
  children: ReactNode
}

export const ModalContext = createContext<ModalContextProps>({
  mutationModal: {
    isShowUp: false,
    title: MODAL_TITLE.ADD,
    productData: defaultData
  },
  setMutationShowUp: () => { },
  loadingShowUp: false,
  setLoadingShowUp: () => { },
  confirmModal: {
    isShowUp: false,
    dataId: ''
  },
  setConfirmShowup: () => { }
})

export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const {
    mutationModal,
    setMutationShowUp,
    loadingShowUp,
    setLoadingShowUp,
    confirmModal,
    setConfirmShowup
  } = useModal();

  const modalContextValue = useMemo(() => ({
    mutationModal,
    setMutationShowUp,
    loadingShowUp,
    setLoadingShowUp,
    confirmModal,
    setConfirmShowup
  }), [mutationModal, setMutationShowUp, loadingShowUp, setLoadingShowUp, confirmModal,
    setConfirmShowup])


  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  )
}
