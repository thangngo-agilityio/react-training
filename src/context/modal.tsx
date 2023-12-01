import { ReactNode, createContext, useMemo } from "react";
import { MODAL_TITLE } from "constants/common";
import { defaultData } from "constants/food";
import { ModalProps } from "store/modal";
import { Food } from "interfaces/product/Product";
import useModal from "@components/hooks/useModal";

interface ModalContextProps {
  mutationModal: ModalProps & {
    productData?: Food
  }
  setMutationShowUp: (
    isShowUp: boolean,
    title?: string,
    productData?: Food
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
  setMutationShowUp: () => { }
})

export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const {
    mutationModal,
    setMutationShowUp
  } = useModal();

  const modalContextValue = useMemo(() => ({
    mutationModal,
    setMutationShowUp
  }), [mutationModal, setMutationShowUp])


  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  )
}
