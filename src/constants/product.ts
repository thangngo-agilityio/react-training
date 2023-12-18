import { Product } from 'types';

export const defaultData: Product = {
  id: '',
  name: '',
  price: 0,
  image: '',
  quantity: 0,
  createdAt: new Date()
};

export type ProductErrorMessage = {
  name?: string;
  price?: string;
  image?: string;
  quantity?: string;
};

export const defaultErrorMessage: ProductErrorMessage = {
  name: '',
  price: '',
  image: '',
  quantity: ''
};
