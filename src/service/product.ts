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

export const addProduct = async (inputProduct: Product) => {
  const product: Product = {
    ...inputProduct,
    createdAt: new Date()
  };
  return await productService.post(product);
};

export const updateProduct = async (inputProduct: Product) => {
  const product: Product = {
    id: inputProduct.id,
    name: inputProduct.name,
    price: Number(inputProduct.price),
    image: inputProduct.image,
    quantity: Number(inputProduct.quantity),
    createdAt: inputProduct.createdAt
  };

  return await productService.put(product, `${inputProduct.id}`);
}
