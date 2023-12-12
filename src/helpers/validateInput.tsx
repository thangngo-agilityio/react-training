import { VALIDATE_MESSAGE } from 'constants/message';
import {
  IMAGE_REGEX,
  NAME_CHARACTERS_REGEX,
  PRICE_REGEX,
  NUMBER_REGEX,
  QUANTITY_REGEX
} from 'constants/regex';

const validateRequired = (value = '', field: string): string | undefined => {
  return value ? undefined : VALIDATE_MESSAGE.REQUIRED_ERROR.replace('{field}', field);
};

/**
 * @description handle validate name
 * @param name
 */
export const validateName = (name = ''): string | undefined => {
  if (!name) {
    return validateRequired(name, 'Name');
  }

  if (!name.match(NAME_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.NAME_VALID;
  }

  return;
};

/**
 * @description handle validate price
 * @param price
 */
export const validatePrice = (price = ''): string | undefined => {
  if (!price) {
    return validateRequired(price, 'Price');
  }

  if (!price.match(NUMBER_REGEX)) {
    return VALIDATE_MESSAGE.NUMBER_VALID;
  }

  if (!price.match(PRICE_REGEX)) {
    return VALIDATE_MESSAGE.PRICE_VALID;
  }

  return;
};

/**
 * @description handle validate image
 * @param image
 */
export const validateImage = (image = ''): string | undefined => {
  if (!image) {
    return validateRequired(image, 'Image');
  }

  if (!image.match(IMAGE_REGEX)) {
    return VALIDATE_MESSAGE.IMAGE_VALID;
  }

  return;
};

/**
 * @description handle validate quantity
 * @param quantity
 */
export const validateQuantity = (quantity = ''): string | undefined => {
  if (!quantity) {
    return validateRequired(quantity, 'Quantity');
  }

  if (!quantity.match(QUANTITY_REGEX)) {
    return VALIDATE_MESSAGE.QUANTITY_VALID;
  }

  return;
};
