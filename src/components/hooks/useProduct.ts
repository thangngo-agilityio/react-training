import { useInfiniteQuery } from '@tanstack/react-query';
import { DEFAULT_LIMITATION, DEFAULT_PAGINATION } from 'constants/filter';
import { getProduct } from 'service/product';

export interface InfiniteQueryProps<T> {
  pages: Array<{
    data: Array<T>;
    pageParams: number;
  }>;
  pageParams: Array<number>
}

function useProduct() {
  const getMoreProducts = async (pageParams: number) => {
    const result = await getProduct('/' + `${pageParams}`);

    return { data: [...result], pageParams: pageParams + 1 };
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
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
    productData: data,
    fetchNextPage,
    hasNextPage,
  };
}

export default useProduct;
