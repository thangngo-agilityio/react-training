// Library
import { FormEvent, Fragment, Suspense, useCallback, useContext, useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
// Context
import { ModalContext } from "context/modal"
import { ToastContext } from "context/toast"
// Constant
import { MODAL_TITLE } from "constants/common"
import { defaultData } from "constants/food"
// Types
import { Product } from "interfaces/product/Product"
// Service
import { deleteProductId, mutationProduct } from "service/product"
// Component
import AddCard from "@components/common/card/addCard/AddCard"
import Spinner from "@components/common/spinner/Spinner"
import MultiModal from "@components/modals/multiModal/MultiModal"
import useProduct, { InfiniteQueryProps } from "@components/hooks/useProduct"
import ProductCard from "@components/common/card/productCard/ProductCard"
import ConfirmModal from "@components/modals/confirmModal/ConfirmModal"
import { ToastType } from "store/Toast"
import { PRODUCT_MESSAGE } from "constants/message"

function MainPage() {
  const [modalProductData, setModalProductData] = useState(defaultData)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [getIdConfirmModal, setGetIdConfirmModal] = useState('')

  const { productData, isLoading } = useProduct()
  const queryClient = useQueryClient()

  const {
    mutationModal,
    setMutationShowUp,
    setLoadingShowUp,
    setConfirmShowup,
  } = useContext(ModalContext)

  useEffect(() => {
    if (mutationModal.productData) {
      setModalProductData(mutationModal.productData)
    }
  }, [mutationModal.productData])

  const { showToast, hideToast } = useContext(ToastContext)

  const { mutate: mutateProduct } = useMutation({
    mutationFn: (input: Product) => {
      return mutationProduct(input)
    },

    onMutate: () => {
      setLoadingShowUp(true)
    },

    onSuccess: (data) => {
      const currentProductData = queryClient.getQueryData<InfiniteQueryProps<Product>>(['products'])

      let toastMessage = '';
      if (currentProductData) {
        let existedProductIndex = -1;

        for (const productPage of currentProductData.pages) {
          const foundProductIndex = productPage.data.findIndex((product) => {
            return product.id === data.id
          })

          if (foundProductIndex > -1) {
            existedProductIndex = foundProductIndex
          }
        }

        if (existedProductIndex < 0) {
          toastMessage = PRODUCT_MESSAGE.ADD_SUCCESS
        } else {
          toastMessage = PRODUCT_MESSAGE.EDIT_SUCCESS
        }
      }

      onCancelModal()
      setLoadingShowUp(false)
      showToast(toastMessage, ToastType.SUCCESS)
      hideToast()
    },
    onError: () => {
      onCancelModal()
      setLoadingShowUp(false)
      showToast(PRODUCT_MESSAGE.ADD_FAILED, ToastType.ERROR)
      hideToast()
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },

    networkMode: 'always'
  })

  const { mutate: deleteProduct } = useMutation({
    mutationFn: (id: string) => {
      return deleteProductId(id)
    },

    onMutate: () => {
      setLoadingShowUp(true)
    },

    onSuccess: () => {
      setShowConfirmModal(false)
      setLoadingShowUp(false)
      showToast(PRODUCT_MESSAGE.REMOVE_SUCCESS, ToastType.SUCCESS)
      hideToast()
    },

    onError: () => {
      setShowConfirmModal(false)
      setLoadingShowUp(false)
      showToast(PRODUCT_MESSAGE.REMOVE_ERROR, ToastType.ERROR)
      hideToast()
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },

    networkMode: 'always'
  })

  // Handle click add product
  const onClickAdd = useCallback(() => {
    setMutationShowUp(true, MODAL_TITLE.ADD, defaultData)
  }, [setMutationShowUp])

  // submit modal
  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutateProduct(modalProductData)
  }, [mutateProduct, modalProductData])

  // submit confirm
  const onConfirm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteProduct(getIdConfirmModal)
  }, [deleteProduct, getIdConfirmModal])

  // Cancel modal
  const onCancelModal = useCallback(() => {
    if (modalProductData?.id === defaultData.id) {
      setModalProductData(defaultData);
    } else {
      setModalProductData(mutationModal.productData!)
    }

    setMutationShowUp(false)
  }, [modalProductData.id, mutationModal.productData, setMutationShowUp])

  // Cancel modal confirm
  const onCancelConfirmModal = useCallback(() => {
    setConfirmShowup(false)
  }, [setConfirmShowup])

  // handle click delete product
  const onClickDelete = useCallback((productId: string) => {
    console.log(productId)
    setShowConfirmModal(true)
    setGetIdConfirmModal(productId)
  }, [setShowConfirmModal, setGetIdConfirmModal])

  // Handle click edit product
  const onClickEditProduct = useCallback((product: Product) => {
    setMutationShowUp(true, MODAL_TITLE.EDIT, product)
  }, [setMutationShowUp])

  return (
    <>
      <main className="main-content">
        <section className="section-manage">
          <div className="manage-list">
            {isLoading && (
              <Spinner />
            )}

            <AddCard onClick={onClickAdd} />

            {productData?.pages.map((page, index) => (
              <Fragment key={index}>
                {page?.data.map(product => (
                  <ProductCard
                    product={product}
                    key={product.id}
                    onClickDel={onClickDelete}
                    onClickEdit={onClickEditProduct}
                  />
                ))}
              </Fragment>
            ))}
          </div>
        </section>
      </main>

      {showConfirmModal && (
        <Suspense fallback={<Spinner />}>
          <ConfirmModal dataId={getIdConfirmModal} onCancelClick={onCancelConfirmModal} onSubmit={onConfirm} />
        </Suspense>
      )}

      {mutationModal.isShowUp && (
        <Suspense fallback={<Spinner />}>
          <MultiModal title={mutationModal.title} productData={modalProductData} setProductData={setModalProductData} onSubmit={onSubmit} onCancelClick={onCancelModal} />
        </Suspense>
      )}
    </>
  )
}

export default MainPage
