import axios from 'axios';

import { getEnvironmentVar } from '../helper';

const { VITE_API_URL } = getEnvironmentVar('VITE_API_URL');
const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

/*
    * interceptors......
*/

calendarApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      'x-token': token,
    },
  };
  return newConfig;
});

export default calendarApi;
