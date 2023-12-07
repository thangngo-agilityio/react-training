import { useInfiniteQuery } from '@tanstack/react-query';
import { DEFAULT_LIMITATION, DEFAULT_PAGINATION, FILTER_ATTRIBUTE } from 'constants/filter';
import { getProduct } from 'service/product';
import { useState } from 'react';

export interface InfiniteQueryProps<T> {
  pages: Array<{
    data: Array<T>;
    pageParams: number;
  }>;
  pageParams: Array<number>
}


function useProduct() {
  const [searchName, setSearchName] = useState('')
  const [sortValue, setSortValue] = useState(FILTER_ATTRIBUTE.DEFAULT)

  const path = `name=${searchName}&${sortValue}&page=`

  const getMoreProducts = async (pageParams: number) => {
    const result = await getProduct(path + `${pageParams}`);

    return { data: [...result], pageParams: pageParams + 1 };
  };


  const { data, refetch, fetchNextPage, hasNextPage, isRefetching } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = DEFAULT_PAGINATION }) => getMoreProducts(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < DEFAULT_LIMITATION) return undefined;

      return lastPage.pageParams;
    },
    initialPageParam: 1,
  });

  return {
    // productList
    productList: data,
    fetchNextPage,
    hasNextPage,
    refetch,
    setSearchName,
    searchName,
    path,
    isRefetching,
    setSortValue,
    sortValue
  };
}

export default useProduct;
