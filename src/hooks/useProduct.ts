import { DEFAULT_LIMITATION, FILTER_ATTRIBUTE } from 'constants/filter';
import { getProduct } from 'service/product';
import { useState } from 'react';
import { Product } from 'interfaces/product/Product';

const useProduct = () => {
  const [searchName, setSearchName] = useState('');
  const [sortValue, setSortValue] = useState(FILTER_ATTRIBUTE.DEFAULT);
  const [getList, setGetList] = useState<Product[]>([]);

  const path = `name=${searchName}&${sortValue}&limit=${DEFAULT_LIMITATION}&page=`;

  const getProductList = async (pageParams: number) => {
    const result = await getProduct(path + `${pageParams}`);
    setGetList(result);
  };


  return {
    getList,
    setGetList,
    getProductList,
    setSearchName,
    setSortValue,
    searchName,
    sortValue,
    path,
  };
};

export default useProduct;
