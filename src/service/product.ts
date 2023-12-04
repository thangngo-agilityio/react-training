import { Product, ProductCard } from 'interfaces/product/Product';
import HttpsService from './httpsService';

const productService = new HttpsService<Product | ProductCard>('products');

export const mutationProduct = async (inputProduct: Product) => {
  if (inputProduct.id === '') {
    const food: ProductCard = {
      name: inputProduct.name,
      price: Number(inputProduct.price),
      image: inputProduct.image,
      quantity: Number(inputProduct.quantity),
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
