window.axios = require("axios");

// Base Url
window.axios.defaults.baseURL = process.env.VUE_APP_API_URL;

// Request Interceptors
window.axios.interceptors.request.use(function (config) {
  const token = JSON.parse(localStorage.getItem("auth_token"));
  if (token != null) {
    config.headers["Authorization"] = token;
  } else {
    config.headers["Authorization"] = null;
  }
  return config;
});

// Response Interceptors
window.axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
