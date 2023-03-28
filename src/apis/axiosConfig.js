import axios from "axios";
import { decryptionData } from "utils/crypto";

export const { REACT_APP_API_URL } = process.env;

export const getLanguageInitial = () => {
  const data = localStorage.getItem('');
  return data || 'en';
};

export const getUserSession = () => {
  const data = localStorage.getItem('');
  return data ? JSON.parse(data) : null;
};

export const removeUserSessionWhenExpired = () => {
  if (true) {
    window.localStorage.removeItem('');
    window.location.href = `${window.location.origin}/app/login`;
  }
};

const userSession = getUserSession();
const AxiosService = axios.create({
  baseURL: REACT_APP_API_URL,
  responseType: 'json',
});

AxiosService.defaults.timeout = 20000;

if (userSession) {
  AxiosService.defaults.headers.common.Authorization = `Bearer ${getUserSession()}`;
}
AxiosService.defaults.headers['X-Requested-With'] = getLanguageInitial();

AxiosService.defaults.transformResponse = (data) => {
  data = JSON.parse(data);
  if (data?.iv) {
    return decryptionData(data.data, 'DE_KEY', data.iv);
  }
  return data;
};

AxiosService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(error);
    }
    if (error?.response?.status === 401 || error?.response?.data?.message === 'jwt expired') {
      removeUserSessionWhenExpired();
    }
    // if (error?.response?.status === 405) {
    //   message.error(error?.response?.data?.message || 'Internal Server Error', 5);
    // }
    return error.response;
  },
);

export default AxiosService;