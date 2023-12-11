// Library
import { FormEvent, Fragment, Suspense, useContext, useState, useEffect } from "react"

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
// import Button from "@components/common/button/Button"
import AddCard from "@components/common/card/addCard/AddCard"
import Spinner from "@components/common/spinner/Spinner"
import MultiModal from "@components/modals/multiModal/MultiModal"
import ProductCard from "@components/common/card/productCard/ProductCard"
import ConfirmModal from "@components/modals/confirmModal/ConfirmModal"
import Header from "@components/header/Header"
import Button from "@components/common/button/Button"

const MainPage = () => {
  // useProduct
  const { productList, getProductList, queryPram, searchName, sortValue, setSearchName, setSortValue, setLimitProduct, limitProduct } = useProduct()

  // useContext
  const { showToast, hideToast } = useContext(ToastContext)

  // useState
  const [errorModalMessage, setErrorModalMessage] = useState(defaultErrorMessage)
  const [modalProductData, setModalProductData] = useState(defaultData)
  const [showMutationModal, setShowMutationModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false)
  const [getIdConfirmModal, setGetIdConfirmModal] = useState('')
  const [titleModal, setTitleModal] = useState('')


  useEffect(() => {
    if (modalProductData) {
      setModalProductData(modalProductData)
    }
  }, [modalProductData])

  useEffect(() => {
    setSearchName(searchName)
    setSortValue(sortValue)
    setLimitProduct(limitProduct)
    getProductList(queryPram)
  }, [searchName, sortValue, limitProduct, setSortValue, setSearchName, setLimitProduct])

  const mutateProduct = async (input: Product): Promise<void> => {
    try {
      if (input.id === '') {
        setIsLoading((prev) => !prev)
        await addProduct(input)
        await getProductList(queryPram)
        console.log(await getProductList(queryPram))
        handleCancelModal()
        showToast(PRODUCT_MESSAGE.ADD_SUCCESS, ToastType.SUCCESS)
        hideToast()
      } else {
        setIsLoading((prev) => !prev)
        await updateProduct(input)
        await getProductList(queryPram)
        handleCancelModal()
        showToast(PRODUCT_MESSAGE.EDIT_SUCCESS, ToastType.SUCCESS)
        hideToast()
      }
    } catch {
      handleCancelModal()
      showToast(PRODUCT_MESSAGE.ADD_FAILED, ToastType.ERROR)
      hideToast()
    }
    setIsLoading((prev) => !prev)
  }

  // Handle delete product
  const deleteProduct = async (id: string) => {
    try {
      setIsLoading((prev) => !prev)
      await deleteProductId(id)
      await getProductList(queryPram)
      setShowConfirmModal(false)
      showToast(PRODUCT_MESSAGE.REMOVE_SUCCESS, ToastType.SUCCESS)
      hideToast()
    } catch {
      setShowConfirmModal(false)
      showToast(PRODUCT_MESSAGE.REMOVE_ERROR, ToastType.ERROR)
      hideToast()
    }
    setIsLoading((prev) => !prev)
  }


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
    setModalProductData(defaultData);
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
  const handleShowMore = async () => {
    try {
      setDisableBtn((prev) => !prev)
      if (productList.length < queryPram.limit) {
        return setDisableBtn((prev) => !prev)
      }
      setLimitProduct((prev) => prev + 9)
      await getProductList(queryPram)
    } catch {
      showToast(PRODUCT_MESSAGE.ADD_FAILED, ToastType.ERROR)
    }
    setDisableBtn((prev) => !prev)
  }

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
  }

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value)
  }

  return (
    <>
      <Header handleChangeSort={handleChangeSort} handleChangeSearch={handleChangeSearch} searchValue={searchName} sortValue={sortValue} />
      <main className="main-content">
        <section className="section-manage">
          <div className="manage-list">
            {isLoading && (
              <Spinner />
            )}

            <AddCard onClick={onClickAdd} />

            {productList.map((product, index) => (
              <Fragment key={index}>
                <ProductCard
                  product={product}
                  key={product.id}
                  onClickDel={handleClickDelete}
                  onClickEdit={handleClickEditProduct}
                />
              </Fragment>
            ))}

            {!isLoading && productList?.length === 0 && (
              <div className="empty-message">
                {PRODUCT_MESSAGE.EMPTY_MESSAGE}
              </div>
            )}
          </div>
          {productList?.length === limitProduct && (<Button classButton="btn btn-expand" isDisabled={disableBtn} onClick={handleShowMore} >
            {disableBtn ? (
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
