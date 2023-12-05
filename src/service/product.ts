import { Product } from 'interfaces/product/Product';
import HttpsService from './httpsService';

const productService = new HttpsService<Product>('products');

export const getProduct = async (path: string) => {
  const listProduct = await productService.get(path);

  return listProduct;
};

export const deleteProductId = async (id: string) => {
  const product = await productService.delete(id);

  return product;
};

export const mutationProduct = async (inputProduct: Product) => {
  if (inputProduct.id === '') {
    const food: Product = {
      ...inputProduct,
    };
    return await productService.post(food);
  } else {
    const food: Product = {
      id: inputProduct.id,
      name: inputProduct.name,
      price: Number(inputProduct.price),
      image: inputProduct.image,
      quantity: Number(inputProduct.quantity),
    };

    return await productService.put(food, `${inputProduct.id}`);
  }
};
