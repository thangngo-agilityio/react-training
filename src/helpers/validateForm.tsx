import { Product } from 'types';
import { validateImage, validateName, validatePrice, validateQuantity } from './validateInput';

/**
 * @description handle validate form product
 * @param product
 */
export const validateForm = (product: Product) => {
  const errorMessage = {
    ...(validateName(product.name) && {
      name: validateName(product.name)
    }),
    ...(validatePrice(product.price.toString()) && {
      price: validatePrice(product.price.toString())
    }),
    ...(validateImage(product.image) && {
      image: validateImage(product.image)
    }),
    ...(validateQuantity(product.quantity.toString()) && {
      quantity: validateQuantity(product.quantity.toString())
    })
  };

  return errorMessage;
};
