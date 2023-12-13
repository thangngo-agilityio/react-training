import { DEFAULT_LIMITATION, DEFAULT_PAGINATION, FILTER_ATTRIBUTE } from 'constants/filter';
import { getProduct } from 'service/product';
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

  const queryPram = {
    page: pageProduct,
    limit: DEFAULT_LIMITATION,
    sortBy: sortValue,
    name: searchName
  };

  // const path = `name=${queryParams.searchValue}&${queryParams.sortBy}&limit=${queryParams.limit}&page=${queryParams.page}`;
  const getProductList = async (queryPram: QueryPramsType) => {
    const path = queryParams(queryPram)

    const result = await getProduct(path);
    setProductList(result);
    return result;
  };

  const handleGetShowMore = async (page: number) => {
    try {
      queryPram.page = page;
      const path = queryParams(queryPram)
      const products = await getProduct(path);
      setProductList(products);
      return products;
    } catch (error) {
      return error;
    }
  };

  return {
    productList,
    handleGetShowMore,
    setPageProduct,
    setProductList,
    getProductList,
    setSearchName,
    setSortValue,
    pageProduct,
    searchName,
    sortValue,
    queryPram,
  };
};

export default useProduct;
