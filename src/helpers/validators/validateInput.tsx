import { IMAGE_REGEX, NAME_CHARACTERS_REGEX } from "constants/regex";

// const validateRequired = (value = '', field: string): string | undefined => {
//   return value ? undefined : VALIDATE_MESSAGE.REQUIRED_ERROR.replace('{field}', field);
// };


/**
 * @description handle validate name
 * @param name
 */
export const validateName = (input: string): boolean => {
  // if (!name) {
  //   return validateRequired(name, 'Name');
  // }

  // if (!input.match(NAME_CHARACTERS_REGEX)) {
  //   return VALIDATE_MESSAGE.NAME_VALID;
  // }

  return input.length != 0 && NAME_CHARACTERS_REGEX.test(input)
}

/**
 * @description handle validate price
 * @param price
 */
export const validatePrice = (input: number): boolean => {
  return input > 0
  // if (!price) {
  //   return validateRequired(price, 'Price');
  // }

  // if (!price.match(PRICE_REGEX)) {
  //   return VALIDATE_MESSAGE.PRICE_VALID;
  // }

  // return;
}

/**
 * @description handle validate image
 * @param image
 */
export const validateImage = (url: string): boolean => {
  return IMAGE_REGEX.test(url)
  // if (!image) {
  //   return validateRequired(image, 'Image');
  // }

  // if (!image.match(IMAGE_REGEX)) {
  //   return VALIDATE_MESSAGE.IMAGE_VALID;
  // }

  // return;
}

/**
 * @description handle validate quantity
 * @param quantity
 */
export const validateQuantity = (input: number): boolean => {
  return Number.isInteger(input) && input > 0;
  // if (!quantity) {
  //   return validateRequired(quantity, 'Quantity');
  // }

  // if (!quantity.match(QUANTITY_REGEX)) {
  //   return VALIDATE_MESSAGE.QUANTITY_VALID;
  // }

}
