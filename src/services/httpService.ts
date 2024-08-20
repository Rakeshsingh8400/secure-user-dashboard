import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (email: string, password: string) => {
  return api.post('/login', { email, password });
};

// You can add other API services here
