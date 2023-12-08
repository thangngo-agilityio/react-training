// Library
import { FormEvent, Fragment, Suspense, useContext, useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

// Context
import { ToastContext } from "context/toast"

// Constant
import { MODAL_TITLE } from "constants/common"
import { PRODUCT_MESSAGE } from "constants/message"
import { defaultData, defaultErrorMessage } from "constants/product"

// Types
import { Product } from "interfaces/product/Product"

// Service
import { addProduct, deleteProductId, updateProduct } from "service/product"

// helper
import { validateForm } from "helpers/validateForm"

// hooks
import useProduct from "hooks/useProduct"
import { ToastType } from "hooks/useToast"

// Component
import Button from "@components/common/button/Button"
import AddCard from "@components/common/card/addCard/AddCard"
import Spinner from "@components/common/spinner/Spinner"
import MultiModal from "@components/modals/multiModal/MultiModal"
import ProductCard from "@components/common/card/productCard/ProductCard"
import ConfirmModal from "@components/modals/confirmModal/ConfirmModal"

function MainPage() {
  const [modalProductData, setModalProductData] = useState(defaultData)
  const [errorModalMessage, setErrorModalMessage] = useState(defaultErrorMessage)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showMutationModal, setShowMutationModal] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [getIdConfirmModal, setGetIdConfirmModal] = useState('')

  const { productList, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useProduct()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (modalProductData) {
      setModalProductData(modalProductData)
    }
  }, [modalProductData])

  const { showToast, hideToast } = useContext(ToastContext)


  const mutateProduct = async (input: Product) => {
    try {
      if (input.id === '') {
        await addProduct(input)
        handleCancelModal()
        showToast(PRODUCT_MESSAGE.ADD_SUCCESS, ToastType.SUCCESS)
        hideToast()
      } else {
        await updateProduct(input)
        handleCancelModal()
        showToast(PRODUCT_MESSAGE.EDIT_SUCCESS, ToastType.SUCCESS)
        hideToast()
      }
    } catch {
      handleCancelModal()
      showToast(PRODUCT_MESSAGE.ADD_FAILED, ToastType.ERROR)
      hideToast()
    }
  }


  // Handle add product and update product
  // const { mutate: mutateProduct } = useMutation({
  //   mutationFn: (input: Product) => {
  //     return mutationProduct(input)
  //   },

  //   onSuccess: (data) => {
  //     const currentProductData = queryClient.getQueryData<InfiniteQueryProps<Product>>(['products'])

  //     let toastMessage = '';
  //     if (currentProductData) {
  //       let existedProductIndex = -1;

  //       for (const productPage of currentProductData.pages) {
  //         const foundProductIndex = productPage.data.findIndex((product) => {
  //           return product.id === data.id
  //         })

  //         if (foundProductIndex > -1) {
  //           existedProductIndex = foundProductIndex
  //         }
  //       }

  //       if (existedProductIndex < 0) {
  //         toastMessage = PRODUCT_MESSAGE.ADD_SUCCESS
  //       } else {
  //         toastMessage = PRODUCT_MESSAGE.EDIT_SUCCESS
  //       }
  //     }

  //     handleCancelModal()
  //     showToast(toastMessage, ToastType.SUCCESS)
  //     hideToast()
  //   },
  //   onError: () => {
  //     handleCancelModal()
  //     showToast(PRODUCT_MESSAGE.ADD_FAILED, ToastType.ERROR)
  //     hideToast()
  //   },

  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ['products'] })
  //   },

  //   networkMode: 'always'
  // })

  // Handle delete product
  const { mutate: deleteProduct } = useMutation({
    mutationFn: (id: string) => {
      return deleteProductId(id)
    },


    onSuccess: () => {
      setShowConfirmModal(false)
      showToast(PRODUCT_MESSAGE.REMOVE_SUCCESS, ToastType.SUCCESS)
      hideToast()
    },

    onError: () => {
      setShowConfirmModal(false)
      showToast(PRODUCT_MESSAGE.REMOVE_ERROR, ToastType.ERROR)
      hideToast()
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },

    networkMode: 'always'
  })

  // Handle click add product
  const onClickAdd = () => {
    setShowMutationModal(true)
    setModalProductData(modalProductData)
    setTitleModal(MODAL_TITLE.ADD)
  }

  // submit modal form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateMessage = validateForm(modalProductData)

    if (Object.values(validateMessage).join('')) {
      setErrorModalMessage(validateMessage)
    } else {
      mutateProduct(modalProductData)
    }
  }

  // submit confirm
  const onConfirm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteProduct(getIdConfirmModal)
  }

  // Cancel modal
  const handleCancelModal = () => {
    if (modalProductData?.id === defaultData.id) {
      setModalProductData(defaultData);
    } else {
      setModalProductData(modalProductData!)
    }

    setErrorModalMessage(defaultErrorMessage)

    setShowMutationModal(false)
  }

  // Cancel modal confirm
  const onCancelConfirmModal = () => {
    setShowConfirmModal(false)
  }

  // handle click delete product
  const handleClickDelete = (productId: string) => {
    setShowConfirmModal(true)
    setGetIdConfirmModal(productId)
  }

  // Handle click edit product
  const handleClickEditProduct = (product: Product) => {
    setShowMutationModal(true)
    setModalProductData(product)
    setTitleModal(MODAL_TITLE.EDIT)
  }

  // Handle click show more
  const handleShowMore = () => {
    fetchNextPage()
  }

  return (
    <>
      <main className="main-content">
        <section className="section-manage">
          <div className="manage-list">
            {isLoading && (
              <Spinner />
            )}

            <AddCard onClick={onClickAdd} />

            {productList?.pages?.map((page, index) => (
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
          {hasNextPage && (<Button classButton="btn btn-expand" isDisabled={isFetchingNextPage} onClick={handleShowMore} >
            {isFetchingNextPage ? (
              <div className="expand-loading"></div>
            ) : 'SHOW MORE'}
          </Button>)}
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
