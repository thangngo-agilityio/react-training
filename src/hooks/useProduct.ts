import { DEFAULT_LIMITATION, DEFAULT_PAGINATION, FILTER_ATTRIBUTE } from 'constants/filter';
import { getProduct } from 'service/product';
import { useState } from 'react';
import { Product } from 'interfaces/product/Product';

export type QueryPramsType = {
  page: number,
  limit: number,
  sortBy: string,
  searchValue: string
}


const useProduct = () => {
  const [searchName, setSearchName] = useState('');
  const [limitProduct, setLimitProduct] = useState(DEFAULT_LIMITATION)
  const [sortValue, setSortValue] = useState(FILTER_ATTRIBUTE.DEFAULT);
  const [productList, setProductList] = useState<Product[]>([]);

  const queryPram: QueryPramsType = {
    page: DEFAULT_PAGINATION,
    limit: limitProduct,
    sortBy: sortValue,
    searchValue: searchName
  }

  const getProductList = async (queryPrams: QueryPramsType) => {
    const path = `name=${queryPrams.searchValue}&${queryPrams.sortBy}&limit=${queryPrams.limit}&page=${queryPrams.page}`
    const result = await getProduct(path);
    console.log('result', result)
    setProductList(result);
    return result
  };

  return {
    productList,
    setLimitProduct,
    setProductList,
    getProductList,
    setSearchName,
    setSortValue,
    limitProduct,
    searchName,
    sortValue,
    queryPram,
  };
};

export default useProduct;
