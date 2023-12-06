import { Product } from "interfaces/product/Product";

export const defaultData: Product = {
  id: '',
  name: '',
  price: 0,
  image: '',
  quantity: 0,
}

export interface ProductErrorMessage {
  name: string;
  price: string
  image: string
  quantity: string
}

export const defaultErrorMessage: ProductErrorMessage = {
  name: '',
  price: '',
  image: '',
  quantity: '',
}
