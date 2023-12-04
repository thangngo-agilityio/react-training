import { FormEvent, Fragment, Suspense, useCallback, useContext, useState } from "react"
import { ModalContext } from "context/modal"
import { MODAL_TITLE } from "constants/common"
import { defaultData } from "constants/food"
import AddCard from "@components/common/card/addCard/AddCard"
import Spinner from "@components/common/spinner/Spinner"
import MultiModal from "@components/modals/multiModal/MultiModal"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Product } from "interfaces/product/Product"
import { mutationProduct } from "service/product"
import useProduct from "@components/hooks/useProduct"
import ProductCard from "@components/common/card/productCard/ProductCard"

function MainPage() {
  const [modalProductData, setModalProductData] = useState(defaultData)

  const { productData } = useProduct()
  const queryClient = useQueryClient()

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
      onCancelModal()
      setLoadingShowUp(false)
    },
    onError: () => {
      onCancelModal()
      setLoadingShowUp(false)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },

    networkMode: 'always'
  })

  const onClickAdd = useCallback(() => {
    setMutationShowUp(true, MODAL_TITLE.ADD, defaultData)
  }, [setMutationShowUp])

  // submit modal
  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutateProduct(modalProductData)
  }, [mutateProduct, modalProductData])

  // Cancel modal
  const onCancelModal = useCallback(() => {
    if (modalProductData?.id === defaultData.id) {
      setModalProductData(defaultData);
    } else {
      setModalProductData(mutationModal.productData!)
    }

    setMutationShowUp(false)
  }, [modalProductData.id, mutationModal.productData, setMutationShowUp])

  return (
    <>
      <main className="main-content">
        <section className="section-manage">
          <div className="manage-list">
            <AddCard onClick={onClickAdd} />

            {productData?.pages.map((page, index) => (
              <Fragment key={index}>
                {page?.data.map(product => (
                  <ProductCard
                    product={product}
                    key={product.id}
                  />
                ))}
              </Fragment>
            ))}
          </div>
        </section>
      </main>

      {mutationModal.isShowUp && (
        <Suspense fallback={<Spinner />}>
          <MultiModal title={mutationModal.title} productData={modalProductData} setProductData={setModalProductData} onSubmit={onSubmit} onCancelClick={onCancelModal} />
        </Suspense>
      )}
    </>
  )
}

export default MainPage
