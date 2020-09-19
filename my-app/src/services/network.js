import axios from 'axios';
import { isObject, isString } from '../utils/checkup';

const network = axios.create();

network.interceptors.request.use(configParam => {
  const config = configParam;
  if (isObject(config.data)) {
    config.data = qs.stringify({ api_key: apiKey, ...config.data });
    return config;
  }
  if (isString(config.data)) {
    const data = qs.parse(config.data);
    config.data = qs.stringify({ api_key: apiKey, ...data });
    return config;
  }
  return config;
});

// network.interceptors.response.use(
//   response => {
//     const { error_code: errorCode } = response?.data;
//     if (errorCode) {
//       const typeError = isTypeError(errorCode);
//       // eslint-disable-next-line prefer-promise-reject-errors
//       if (typeError === 'global' || typeError === 'rare')
//         return Promise.resolve({ ...response, global: typeError, error_code: errorCode });
//     }
//     return Promise.resolve(response);
//   },
//   errorParam => {
//     const error = errorParam;
//     const resp = error.response;
//     resp?.status === 401 || (resp?.data?.description === AUTH_ERROR_DESCRIPTION && errorAuthentification());
//     if (resp?.data && !resp.data.ok && resp.data.description) {
//       return { ...resp, global: 'global' };
//     }
//     if (!resp || (!resp.status && resp.status > 499)) {
//       error.message = 'Произошла ошибка соединения с сервером';
//     }
//     error.global = 'global';
//     return error;
//   }
// );

export default network;
