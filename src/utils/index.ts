import { forEach, isEmpty } from 'lodash-es';
import CryptoJS from 'crypto-js';

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  link?: any;
  position?: string;
}

const deleteEmptyValue = (object: any) => {
  forEach(Object.keys(object), (key) => {
    if (typeof object[key] === 'object' && !isEmpty(object[key])) {
      object[key] = deleteEmptyValue(object[key]);
    } else if (
      (typeof object[key] !== 'boolean' && [undefined, '', null].includes(object[key])) ||
      (typeof object[key] === 'object' && isEmpty(object[key]))
    ) {
      delete object[key];
    }
  });
  return object;
};

/**
 *
 * @param data
 * @param secretKey
 */
const dataEncryption = (data: any, secretKey: string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

/**
 *
 * @param cipherText
 * @param secretKey
 */
const dataDecryption = (cipherText: any, secretKey: string) => {
  if (cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  return null;
};

const splitNameField = (text: string, txtToDelete: string) => {
  return text?.replace(txtToDelete, '');
};

const convertPagination = (pagination: Pagination, position = 'top') => {
  return {
    current: pagination.current_page,
    total: pagination.total,
    pageSize: pagination.per_page,
    position: position,
  };
};

export { deleteEmptyValue, dataDecryption, dataEncryption, splitNameField, convertPagination };
