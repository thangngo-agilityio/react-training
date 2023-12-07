import { Product } from "interfaces/product/Product";
import { validateImage, validateName, validatePrice, validateQuantity } from "./validateInput";
import { ProductErrorMessage } from "constants/product";
import { VALIDATE_MESSAGE } from "constants/message";

/**
 * @description handle validate form product
 * @param product
 */
export const validateForm = (product: Product): ProductErrorMessage => {
  const errorMessage: ProductErrorMessage = {
    name: validateName(product.name) ? '' : VALIDATE_MESSAGE.NAME_VALID,
    price: validatePrice(Number(product.price)) ? '' : VALIDATE_MESSAGE.PRICE_VALID,
    image: validateImage(product.image) ? '' : VALIDATE_MESSAGE.IMAGE_VALID,
    quantity: validateQuantity(Number(product.quantity)) ? '' : VALIDATE_MESSAGE.QUANTITY_VALID,
  }

  return errorMessage;
}
