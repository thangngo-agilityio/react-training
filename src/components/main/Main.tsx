import { FormEvent, Suspense, useCallback, useContext, useState } from "react"
import { ModalContext } from "context/modal"
import { MODAL_TITLE } from "constants/common"
import { defaultData } from "constants/food"
import AddCard from "@components/common/card/addCard/AddCard"
import Spinner from "@components/common/spinner/Spinner"
import MultiModal from "@components/modals/multiModal/MultiModal"
import { useMutation } from "@tanstack/react-query"
import { Product } from "interfaces/product/Product"
import { mutationProduct } from "service/product"

function MainPage() {
  const [modalProductData, setModalProductData] = useState(defaultData)
  const {
    mutationModal,
    setMutationShowUp,
    setLoadingShowUp
  } = useContext(ModalContext)


  const { mutate: mutateProduct } = useMutation({
    mutationFn: (input: Product) => {
      return mutationProduct(input)
    },

    onMutate: () => {
      setLoadingShowUp(true)
    },

    onSuccess: () => {
      setLoadingShowUp(false)
    },
    onError: () => {
      setLoadingShowUp(false)
    }
  })

  const onClickAdd = useCallback(() => {
    setMutationShowUp(true, MODAL_TITLE.ADD, defaultData)
  }, [setMutationShowUp])

  const handleCreateProduct = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutateProduct(modalProductData)
  }, [mutateProduct, modalProductData])

  return (
    <>
      <main className="main-content">
        <section className="section-manage">
          <div className="manage-list">
            <AddCard onClick={onClickAdd} />

          </div>
        </section>
      </main>

      {mutationModal.isShowUp && (
        <Suspense fallback={<Spinner />}>
          <MultiModal title={mutationModal.title} productData={modalProductData} setProductData={setModalProductData} onSubmit={(handleCreateProduct)} />
        </Suspense>
      )}
    </>
  )
}

export default MainPage
