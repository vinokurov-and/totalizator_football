/**
 * Проверка на undefined
 * @param {*} value
 */
export const isUndefined = value => typeof value === 'undefined';
/**
 * Проверка на строку (аналог lodash/isString)
 * @param {*} value
 */
export const isString = value => typeof value === 'string';
/**
 * Проверка на число
 */
export const isNumber = value => typeof value === 'number';
/**
 * Проверка на null
 * @param {*} value
 */
export const isNull = value => value === null;
/**
 * Проверка на object
 * @param {*} value
 */
export const isObject = value => {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
};

export default [];
