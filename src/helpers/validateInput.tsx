import { IMAGE_REGEX, NAME_CHARACTERS_REGEX } from "constants/regex";

/**
 * @description handle validate name
 * @param name
 */
export const validateName = (input: string): boolean => {
  return input.length != 0 && NAME_CHARACTERS_REGEX.test(input)
}

/**
 * @description handle validate price
 * @param price
 */
export const validatePrice = (input: number): boolean => {
  return input > 0
}

/**
 * @description handle validate image
 * @param image
 */
export const validateImage = (url: string): boolean => {
  return IMAGE_REGEX.test(url)
}

/**
 * @description handle validate quantity
 * @param quantity
 */
export const validateQuantity = (input: number): boolean => {
  return Number.isInteger(input) && input > 0;
}
