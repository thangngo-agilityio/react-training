import { useState } from 'react';
import { Product } from 'types';
import { queryParams } from 'helpers/buildQueryString';
import { addProduct, deleteProductId, getProduct, updateProduct } from 'service/product';
import { DEFAULT_LIMITATION, DEFAULT_PAGINATION, FILTER_ATTRIBUTE } from '@constants/index';

export type QueryPramsType = {
  page: number;
  limit: number;
  sortBy: string;
  name: string;
};

const useProduct = () => {
  const [searchName, setSearchName] = useState('');
  const [pageProduct, setPageProduct] = useState(DEFAULT_PAGINATION);
  const [sortValue, setSortValue] = useState(FILTER_ATTRIBUTE.DEFAULT);
  const [isLastPage, setIsLastPage] = useState(Boolean);
  const [productList, setProductList] = useState<Product[]>([]);

  const queryParam = {
    page: pageProduct,
    limit: DEFAULT_LIMITATION,
    sortBy: sortValue,
    name: searchName
  };

  // Get product
  const getProductList = async (queryParam: QueryPramsType) => {
    const path = queryParams(queryParam);
    const result = await getProduct(path);
    setProductList(result);
    if (result.length < 9) {
      setIsLastPage(false);
    } else {
      setIsLastPage(true);
    }
    return result;
  };

  // handle Show more
  const handleGetShowMore = async (page: number) => {
    queryParam.page = page;
    const products = await getProductList(queryParam);
    setProductList(productList.concat(products));
  };

  const handleAddProduct = async (data: Product) => {
    await addProduct(data);
    await getProductList(queryParam);
  };

  const handleUpdateProduct = async (data: Product) => {
    await updateProduct(data);
    await getProductList(queryParam);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProductId(id);
    await getProductList(queryParam);
  };

  return {
    productList,
    handleUpdateProduct,
    handleDeleteProduct,
    handleGetShowMore,
    handleAddProduct,
    setPageProduct,
    setProductList,
    getProductList,
    setSearchName,
    setSortValue,
    pageProduct,
    searchName,
    sortValue,
    queryParam,
    isLastPage
  };
};

export default useProduct;
