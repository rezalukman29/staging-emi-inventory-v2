import axios from 'axios';
import { localStorageService } from './localStorage';

const ax = axios.create({
  baseURL: 'https://dev.emi-project.my.id',
});

ax.interceptors.request.use(
  async (configuration: any) => {
    const auth =  localStorageService.getAuth("auth");
    configuration.headers['Content-Type'] = 'application/json';
    if (auth) {
      configuration.headers['User-Id'] = JSON.parse(auth).id;
    } else {
      configuration.headers['User-Id'] = 8;
    }
    return configuration;
  },
  (error: any) => {
    Promise.reject(error);
  },
);

export default ax;
