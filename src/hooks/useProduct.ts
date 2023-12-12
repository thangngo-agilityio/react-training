import { DEFAULT_LIMITATION, DEFAULT_PAGINATION, FILTER_ATTRIBUTE } from 'constants/filter';
import { getProduct } from 'service/product';
import { useState } from 'react';
import { Product } from 'types/product/Product';

export type QueryPramsType = {
  page: number;
  limit: number;
  sortBy: string;
  searchValue: string;
};

const useProduct = () => {
  const [searchName, setSearchName] = useState('');
  const [pageProduct, setPageProduct] = useState(DEFAULT_PAGINATION);
  const [sortValue, setSortValue] = useState(FILTER_ATTRIBUTE.DEFAULT);
  const [productList, setProductList] = useState<Product[]>([]);

  const queryPram: QueryPramsType = {
    page: pageProduct,
    limit: DEFAULT_LIMITATION,
    sortBy: sortValue,
    searchValue: searchName
  };

  const path = `name=${queryPram.searchValue}&${queryPram.sortBy}&limit=${queryPram.limit}&page=`;

  const getProductList = async (pageParams: number) => {

    const result = await getProduct(path + `${pageParams}`);
    setProductList(result);
    return { productList: [...result], pageParams: pageParams + 1 };
  };

  return {
    productList,
    setPageProduct,
    setProductList,
    getProductList,
    setSearchName,
    setSortValue,
    pageProduct,
    searchName,
    sortValue,
    queryPram
  };
};

export default useProduct;
