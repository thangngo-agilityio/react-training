// Library
import { FormEvent, Fragment, Suspense, useContext, useState, useEffect } from 'react';

// Context
import { ToastContext } from 'context/toast';

// Constant
import { MODAL_TITLE } from 'constants/common';
import { PRODUCT_MESSAGE } from 'constants/message';
import { defaultData, defaultErrorMessage } from 'constants/product';

// Types
import { Product } from 'types/product/Product';

// Service
import { addProduct, deleteProductId, updateProduct } from 'service/product';

// helper
import { validateForm } from 'helpers/validateForm';

// hooks
import useProduct from 'hooks/useProduct';
import { ToastType } from 'hooks/useToast';

// Component
import ProductCard from '@components/common/card/productCard/ProductCard';
import ProductModal from '@components/ProductModal/ProductModal';
import AddCard from '@components/common/card/addCard/AddCard';
import Spinner from '@components/common/spinner/Spinner';
import Button from '@components/common/button/Button';
import Header from '@components/header/Header';
import InputField from '@components/common/inputField/InputField';

// Css
import './main-page.css';

const MainPage = () => {
  // useProduct
  const {
    productList,
    getProductList,
    queryPram,
    searchName,
    sortValue,
    setSearchName,
    setSortValue,
    setLimitProduct,
    limitProduct
  } = useProduct();

  // useContext
  const { showToast, hideToast } = useContext(ToastContext);

  // useState
  const [errorModalMessage, setErrorModalMessage] = useState(defaultErrorMessage);
  const [modalProductData, setModalProductData] = useState(defaultData);
  const [showMutationModal, setShowMutationModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [getIdConfirmModal, setGetIdConfirmModal] = useState('');
  const [titleModal, setTitleModal] = useState('');

  useEffect(() => {
    if (modalProductData) {
      setModalProductData(modalProductData);
    }
  }, [modalProductData]);

  useEffect(() => {
    setIsLoading((prevLoading) => !prevLoading);
    setSearchName(searchName);
    setSortValue(sortValue);
    setLimitProduct(limitProduct);
    getProductList(queryPram);
    setTimeout(() => {
      setIsLoading((prevLoading) => !prevLoading);
    }, 1000);
  }, [searchName, sortValue, limitProduct, setSortValue, setSearchName, setLimitProduct]);

  const mutateProduct = async (input: Product): Promise<void> => {
    try {
      if (input.id === '') {
        setIsLoading((prev) => !prev);
        await addProduct(input);
        await getProductList(queryPram);
        console.log(await getProductList(queryPram));
        handleCancelModal();
        showToast(PRODUCT_MESSAGE.ADD_SUCCESS, ToastType.SUCCESS);
        hideToast();
      } else {
        setIsLoading((prev) => !prev);
        await updateProduct(input);
        await getProductList(queryPram);
        handleCancelModal();
        showToast(PRODUCT_MESSAGE.EDIT_SUCCESS, ToastType.SUCCESS);
        hideToast();
      }
    } catch {
      handleCancelModal();
      showToast(PRODUCT_MESSAGE.ADD_FAILED, ToastType.ERROR);
      hideToast();
    }
    setIsLoading((prev) => !prev);
  };

  // Handle delete product
  const deleteProduct = async (id: string) => {
    try {
      setIsLoading((prev) => !prev);
      await deleteProductId(id);
      await getProductList(queryPram);
      setShowConfirmModal(false);
      showToast(PRODUCT_MESSAGE.REMOVE_SUCCESS, ToastType.SUCCESS);
      hideToast();
    } catch {
      setShowConfirmModal(false);
      showToast(PRODUCT_MESSAGE.REMOVE_ERROR, ToastType.ERROR);
      hideToast();
    }
    setIsLoading((prev) => !prev);
  };

  // Handle click add product
  const onClickAdd = () => {
    setShowMutationModal(true);
    setModalProductData(modalProductData);
    setTitleModal(MODAL_TITLE.ADD);
  };

  // submit modal form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateMessage = validateForm(modalProductData);

    if (Object.values(validateMessage).join('')) {
      setErrorModalMessage(validateMessage);
    } else {
      mutateProduct(modalProductData);
    }
  };

  // submit confirm
  const onConfirm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteProduct(getIdConfirmModal);
  };

  // Cancel modal
  const handleCancelModal = () => {
    setModalProductData(defaultData);
    setErrorModalMessage(defaultErrorMessage);
    setShowMutationModal(false);
  };

  // Cancel modal confirm
  const onCancelConfirmModal = () => {
    setShowConfirmModal(false);
  };

  // handle click delete product
  const handleClickDelete = (productId: string) => {
    setShowConfirmModal(true);
    setGetIdConfirmModal(productId);
  };

  // Handle click edit product
  const handleClickEditProduct = (product: Product) => {
    setShowMutationModal(true);
    setModalProductData(product);
    setTitleModal(MODAL_TITLE.EDIT);
  };

  // Handle click show more
  const handleShowMore = async () => {
    try {
      setIsLoading((prevLoading) => !prevLoading);
      setDisableBtn((prevDisable) => !prevDisable);
      setLimitProduct((prev) => prev + 9);
    } catch {
      showToast(PRODUCT_MESSAGE.ADD_FAILED, ToastType.ERROR);
    }
    setDisableBtn((prevDisable) => !prevDisable);
    setIsLoading((prevLoading) => !prevLoading);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trimStart();
    setModalProductData({
      ...modalProductData,
      [e.target.name]: value
    });
  };

  return (
    <>
      <Header
        handleChangeSort={handleChangeSort}
        handleChangeSearch={handleChangeSearch}
        searchValue={searchName}
        sortValue={sortValue}
      />
      <main className="main-content">
        <section className="section-manage">
          <div className="manage-list">
            {isLoading && <Spinner />}

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
              <div className="empty-message">{PRODUCT_MESSAGE.EMPTY_MESSAGE}</div>
            )}
          </div>
          {productList?.length === limitProduct && (
            <Button
              classButton="btn btn-expand"
              type="button"
              isDisabled={disableBtn}
              onClick={handleShowMore}
              children="SHOW MORE"
            />
          )}
        </section>
      </main>

      {showConfirmModal && (
        <Suspense fallback={<Spinner />}>
          <ProductModal
            classTitle="confirm-title"
            title="Are you sure you want to delete this food?"
            onCancelClick={onCancelConfirmModal}
            onSubmit={onConfirm}
            dataId={getIdConfirmModal}
            textBtn="Yes"
          />
        </Suspense>
      )}

      {showMutationModal && (
        <Suspense fallback={<Spinner />}>
          <ProductModal
            title={titleModal}
            onSubmit={handleSubmit}
            onCancelClick={handleCancelModal}
            textBtn="Save"
            children={
              <>
                <div className="form-item">
                  <InputField
                    htmlFor="name"
                    labelClass="form-title"
                    label="Name"
                    type="text"
                    inputClass="form-input"
                    name="name"
                    value={modalProductData.name}
                    onChange={handleChangeInput}
                  />
                  {errorModalMessage.name && (
                    <p id="name-error" className="error-message">
                      {errorModalMessage.name}
                    </p>
                  )}
                </div>
                <div className="form-item">
                  <InputField
                    htmlFor="price"
                    labelClass="form-title"
                    label="Price"
                    type="number"
                    inputClass="form-input"
                    name="price"
                    value={`${modalProductData.price}`}
                    onChange={handleChangeInput}
                  />
                  <p id="price-error" className="error-message">
                    {errorModalMessage.price}
                  </p>
                </div>
                <div className="form-item">
                  <InputField
                    htmlFor="image"
                    labelClass="form-title"
                    label="Image URL"
                    type="text"
                    inputClass="form-input"
                    name="image"
                    value={modalProductData.image}
                    onChange={handleChangeInput}
                  />
                  <p id="image-error" className="error-message">
                    {errorModalMessage.image}
                  </p>
                </div>
                <div className="form-item is-special">
                  <InputField
                    htmlFor="quantity"
                    labelClass="form-title"
                    label="Quantity"
                    type="number"
                    inputClass="form-input is-size"
                    name="quantity"
                    value={`${modalProductData.quantity}`}
                    onChange={handleChangeInput}
                  />
                  <p id="quantity-error" className="error-message">
                    {errorModalMessage.quantity}
                  </p>
                </div>
              </>
            }
          />
        </Suspense>
      )}
    </>
  );
};

export default MainPage;
