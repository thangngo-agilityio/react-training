import { DEFAULT_LIMITATION, DEFAULT_PAGINATION, FILTER_ATTRIBUTE } from 'constants/filter';
import { addProduct, deleteProductId, getProduct, updateProduct } from 'service/product';
import { useState } from 'react';
import { Product } from 'types/product/Product';
import { queryParams } from 'helpers/buildQueryString';

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
  const [productList, setProductList] = useState<Product[]>([]);

  const queryParam = {
    page: pageProduct,
    limit: DEFAULT_LIMITATION,
    sortBy: sortValue,
    name: searchName
  };

  const getProductList = async (queryParam: QueryPramsType) => {
    const path = queryParams(queryParam);
    const result = await getProduct(path);
    setProductList(result);
    console.log('result', result)
    return result;
  };

  const handleGetShowMore = async (page: number) => {
    queryParam.page = page;
    const path = queryParams(queryParam);
    const products = await getProduct(path);
    setProductList([...productList, ...products]);
    return products;
  };

  const handleAddProduct = async (data: Product) => {
    await addProduct(data)
    await handleGetShowMore(queryParam.page)
  }

  const handleUpdateProduct = async (data: Product) => {
    await updateProduct(data)
    await handleGetShowMore(queryParam.page)
  }

  const handleDeleteProduct = async (id: string) => {
    await deleteProductId(id)
    await handleGetShowMore(queryParam.page)
  }

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
    queryParam
  };
};

export default useProduct;
