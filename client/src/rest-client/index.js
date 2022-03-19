import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8080/api/company",
  headers: [""],
});

export const GET = (url, params = {}, headers = {}) => {
  return httpClient.get(url, {
    params,
    headers,
  });
};

export const POST = ({url, requestBody, headers = {}}) => {
  return httpClient.post(url, requestBody, {
    headers,
  });
};

export const PUT = ({url, requestBody, headers = {}}) => {
  return httpClient.put(url, requestBody, {
    headers,
  });
};

export const DELETE = (url, params = {}, headers = {}) => {
    return httpClient.delete(url, {
      headers,
      params,
    });
  };


export const setDefaultHeaders = (headerName, headerValue) => {
  httpClient.defaults.headers.common[headerName] = headerValue;
};

export const removeDefaultHeaders = (headerName) => {
  httpClient.defaults.headers.common[headerName] = "";
};