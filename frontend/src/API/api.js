import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const fetchTransactions = (month, page, perPage, search) =>
  axios.get(`${BASE_URL}/transactions`, {
    params: { month, page, perPage, search },
  });

export const fetchStatistics = (month) =>
  axios.get(`${BASE_URL}/statistics`, { params: { month } });

export const fetchBarChart = (month) =>
  axios.get(`${BASE_URL}/bar-chart`, { params: { month } });

export const fetchPieChart = (month) =>
  axios.get(`${BASE_URL}/pie-chart`, { params: { month } });

export const fetchCombinedData = (month) =>
  axios.get(`${BASE_URL}/combined-data`, { params: { month } });
