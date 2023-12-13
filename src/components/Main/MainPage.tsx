// Library
import { FormEvent, Fragment, Suspense, useContext, useState, useEffect, useRef } from 'react';

// Context
import { ToastContext } from 'context/toast';

// Constant
import { MODAL_TITLE } from 'constants/common';
import { PRODUCT_MESSAGE } from 'constants/message';
import { defaultData, defaultErrorMessage } from 'constants/product';

// Types
import { Product } from 'types/product/Product';

// helper
import { validateForm } from 'helpers/validateForm';

// hooks
import useProduct from 'hooks/useProduct';
import { ToastType } from 'hooks/useToast';

// Component
import { AddCard, Button, Header, Modal, ProductCard, ProductModal, Spinner } from '..';

// Css
import './main-page.css';
import { DEFAULT_LIMITATION, DEFAULT_PAGINATION } from '../../constants/filter';

const MainPage = () => {
  // useProduct
  const {
    productList,
    getProductList,
    searchName,
    sortValue,
    queryParam,
    setSearchName,
    setSortValue,
    handleUpdateProduct,
    handleDeleteProduct,
    handleGetShowMore,
    handleAddProduct,
    setPageProduct
  } = useProduct();

  // useContext
  const { showToast } = useContext(ToastContext);

  // useState
  const [errorModalMessage, setErrorModalMessage] = useState(defaultErrorMessage);
  const [modalProductData, setModalProductData] = useState(defaultData);
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getIdConfirmModal, setGetIdConfirmModal] = useState('');
  const [titleModal, setTitleModal] = useState('');

  const pageRef = useRef(DEFAULT_PAGINATION);

  useEffect(() => {
    getProductList(queryParam);
  }, [searchName, sortValue]);

  // handle add product
  const handleCreateProduct = async (product: Product): Promise<void> => {
    try {
      setIsLoading(true);
      await handleAddProduct(product)
      handleCancelModal();
      showToast(PRODUCT_MESSAGE.ADD_SUCCESS, ToastType.SUCCESS);
    } catch {
      showToast(PRODUCT_MESSAGE.ADD_FAILED, ToastType.SUCCESS);
    }
    setIsLoading(false);
  };

  // Handle Edit Product
  const handleEditProduct = async (product: Product): Promise<void> => {
    try {
      setIsLoading(true);
      await handleUpdateProduct(product)
      handleCancelModal();
      showToast(PRODUCT_MESSAGE.EDIT_SUCCESS, ToastType.SUCCESS);
    } catch {
      showToast(PRODUCT_MESSAGE.EDIT_FAILED, ToastType.SUCCESS);
    }
    setIsLoading(false);
  };

  // Handle delete product
  const deleteProduct = async (id: string) => {
    try {
      setIsLoading(true);
      await handleDeleteProduct(id)
      setShowConfirmModal(false);
      showToast(PRODUCT_MESSAGE.REMOVE_SUCCESS, ToastType.SUCCESS);
    } catch {
      setShowConfirmModal(false);
      showToast(PRODUCT_MESSAGE.REMOVE_ERROR, ToastType.ERROR);
    }
    setIsLoading(false);
  };

  // submit modal form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateMessage = validateForm(modalProductData);

    if (Object.values(validateMessage).join('')) {
      setErrorModalMessage(validateMessage);
    } else {
      if (modalProductData.id === '') {
        handleCreateProduct(modalProductData);
      } else {
        handleEditProduct(modalProductData);
      }
    }
  };

  // submit confirm
  const handleConfirm = () => {
    deleteProduct(getIdConfirmModal);
  };

  // Cancel modal
  const handleCancelModal = () => {
    setModalProductData(defaultData);
    setErrorModalMessage(defaultErrorMessage);
    setShowModalProduct(false);
  };

  // Cancel modal confirm
  const handleCancelConfirmModal = () => {
    setShowConfirmModal(false);
  };

  // handle click delete product
  const handleClickDelete = (productId: string) => {
    setShowConfirmModal(true);
    setGetIdConfirmModal(productId);
  };

  // Handle click add product
  const handleClickAdd = () => {
    setShowModalProduct(true);
    setModalProductData(modalProductData);
    setTitleModal(MODAL_TITLE.ADD);
  };

  // Handle click edit product
  const handleClickEditProduct = (product: Product) => {
    setShowModalProduct(true);
    setModalProductData(product);
    setTitleModal(MODAL_TITLE.EDIT);
  };

  // Handle click show more
  const handleShowMore = async () => {
    try {
      setIsLoading(true);
      const data = (await handleGetShowMore(pageRef.current + 1)) as Product[];

      if (data.length > 0) {
        pageRef.current += 1;
        setPageProduct((pageRef.current += 1));
      }
    } catch {
      showToast(PRODUCT_MESSAGE.GET_ERROR, ToastType.ERROR);
    }
    setIsLoading(false);
  };

  // handle search value
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)
    setSearchName(e.target.value);
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  };

  // handle sort value
  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true)
    setSortValue(e.target.value);
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
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

            <AddCard onClick={handleClickAdd} />

            {productList?.map((product) => (
              <Fragment key={product.id}>
                <ProductCard
                  product={product}
                  onClickDel={handleClickDelete}
                  onClickEdit={handleClickEditProduct}
                />
              </Fragment>
            ))}

            {!isLoading && productList?.length === 0 && (
              <div className="empty-message">{PRODUCT_MESSAGE.EMPTY_MESSAGE}</div>
            )}
          </div>
          {productList?.length === DEFAULT_LIMITATION && (
            <Button
              classButton="btn btn-expand"
              type="button"
              isDisabled={isLoading}
              onClick={handleShowMore}
              children="SHOW MORE"
            />
          )}
        </section>
      </main>

      {showConfirmModal && (
        <Suspense fallback={<Spinner />}>
          <Modal
            classTitle="confirm-title"
            title="Are you sure you want to delete this food?"
            dataId={getIdConfirmModal}
          >
            <div className="form-btn">
              <Button
                children="Cancel"
                type="button"
                classButton="btn btn-cancel"
                onClick={handleCancelConfirmModal}
              />
              <Button
                type="button"
                onClick={handleConfirm}
                children="Confirm"
                classButton="btn btn-cancel"
              />
            </div>
          </Modal>
        </Suspense>
      )}

      {showModalProduct && (
        <Suspense fallback={<Spinner />}>
          <Modal title={titleModal}>
            {
              <ProductModal
                product={modalProductData}
                errorProductMessage={errorModalMessage}
                onchange={handleChangeInput}
                onSubmit={handleSubmit}
                onCancelClick={handleCancelModal}
              />
            }
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default MainPage;
