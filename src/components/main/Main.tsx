// Library
import { FormEvent, Fragment, Suspense, useCallback, useContext, useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
// Context
import { ToastContext } from "context/toast"
// Constant
import { MODAL_TITLE } from "constants/common"
import { defaultData, defaultErrorMessage } from "constants/product"
import { PRODUCT_MESSAGE } from "constants/message"
// Types
import { Product } from "interfaces/product/Product"
// Service
import { deleteProductId, mutationProduct } from "service/product"
// Store
import { ToastType } from "store/Toast"
// helper
import { validateForm } from "helpers/validators/validateForm"
// Component
import AddCard from "@components/common/card/addCard/AddCard"
import Spinner from "@components/common/spinner/Spinner"
import MultiModal from "@components/modals/multiModal/MultiModal"
import useProduct, { InfiniteQueryProps } from "@components/hooks/useProduct"
import ProductCard from "@components/common/card/productCard/ProductCard"
import ConfirmModal from "@components/modals/confirmModal/ConfirmModal"

function MainPage() {
  const [modalProductData, setModalProductData] = useState(defaultData)
  const [errorModalMessage, setErrorModalMessage] = useState(defaultErrorMessage)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showMutationModal, setShowMutationModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [getIdConfirmModal, setGetIdConfirmModal] = useState('')

  const { productList } = useProduct()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (modalProductData) {
      setModalProductData(modalProductData)
    }
  }, [modalProductData])

  const { showToast, hideToast } = useContext(ToastContext)

  // Handle add product and update product
  const { mutate: mutateProduct } = useMutation({
    mutationFn: (input: Product) => {
      return mutationProduct(input)
    },

    onMutate: () => {
      setIsLoading(true)
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

      handleCancelModal()
      setIsLoading(false)
      showToast(toastMessage, ToastType.SUCCESS)
      hideToast()
    },
    onError: () => {
      handleCancelModal()
      setIsLoading(false)
      showToast(PRODUCT_MESSAGE.ADD_FAILED, ToastType.ERROR)
      hideToast()
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },

    networkMode: 'always'
  })

  // Handle delete product
  const { mutate: deleteProduct } = useMutation({
    mutationFn: (id: string) => {
      return deleteProductId(id)
    },

    onMutate: () => {
      setIsLoading(true)
    },

    onSuccess: () => {
      setShowConfirmModal(false)
      setIsLoading(false)
      showToast(PRODUCT_MESSAGE.REMOVE_SUCCESS, ToastType.SUCCESS)
      hideToast()
    },

    onError: () => {
      setShowConfirmModal(false)
      setIsLoading(false)
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
    setShowMutationModal(true)
    setModalProductData(modalProductData)
    setTitleModal(MODAL_TITLE.ADD)
  }, [setShowMutationModal, setModalProductData, setTitleModal])

  // submit modal form
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validateMessage = validateForm(modalProductData)

    if (Object.values(validateMessage).join('')) {
      setErrorModalMessage(validateMessage)
    } else {
      mutateProduct(modalProductData)
    }

  }, [mutateProduct, modalProductData])

  // submit confirm
  const onConfirm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteProduct(getIdConfirmModal)
  }, [deleteProduct, getIdConfirmModal])

  // Cancel modal
  const handleCancelModal = useCallback(() => {
    if (modalProductData?.id === defaultData.id) {
      setModalProductData(defaultData);
    } else {
      setModalProductData(modalProductData!)
    }

    setErrorModalMessage(defaultErrorMessage)

    setShowMutationModal(false)
  }, [modalProductData.id, modalProductData, setShowMutationModal])

  // Cancel modal confirm
  const onCancelConfirmModal = useCallback(() => {
    setShowConfirmModal(false)
  }, [setShowConfirmModal])

  // handle click delete product
  const handleClickDelete = useCallback((productId: string) => {
    setShowConfirmModal(true)
    setGetIdConfirmModal(productId)
  }, [setShowConfirmModal, setGetIdConfirmModal])

  // Handle click edit product
  const handleClickEditProduct = useCallback((product: Product) => {
    setShowMutationModal(true)
    setModalProductData(product)
    setTitleModal(MODAL_TITLE.EDIT)
  }, [setShowMutationModal, setModalProductData, setTitleModal])

  return (
    <>
      <main className="main-content">
        <section className="section-manage">
          <div className="manage-list">
            {isLoading && (
              <Spinner />
            )}

            <AddCard onClick={onClickAdd} />

            {productList?.pages.map((page, index) => (
              <Fragment key={index}>
                {page?.data.map(product => (
                  <ProductCard
                    product={product}
                    key={product.id}
                    onClickDel={handleClickDelete}
                    onClickEdit={handleClickEditProduct}
                  />
                ))}
              </Fragment>
            ))}

            {!isLoading && productList?.pages[0].data.length === 0 && (
              <div className="empty-message">
                {PRODUCT_MESSAGE.EMPTY_MESSAGE}
              </div>
            )}
          </div>
        </section>
      </main>

      {showConfirmModal && (
        <Suspense fallback={<Spinner />}>
          <ConfirmModal dataId={getIdConfirmModal} onCancelClick={onCancelConfirmModal} onSubmit={onConfirm} />
        </Suspense>
      )}

      {showMutationModal && (
        <Suspense fallback={<Spinner />}>
          <MultiModal title={titleModal} productData={modalProductData} setProductData={setModalProductData} errorProductMessage={errorModalMessage} onSubmit={handleSubmit} onCancelClick={handleCancelModal} />
        </Suspense>
      )}
    </>
  )
}

export default MainPage
