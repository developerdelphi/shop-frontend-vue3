import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true,
});

Api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const status = err.response.status;

    if (status === 419) {
      // Refresh our session token
      await Api.get('sanctum/csrf-cookie');

      // Return a new request using the original request's configuration
      return Api(err.response.config);
    }

    return Promise.reject(err);
  }
);

export default Api;
