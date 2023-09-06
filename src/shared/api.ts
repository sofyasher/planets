export const API_URL = 'https://swapi.dev/api';
export const PLANETS_LIST_URL = `${API_URL}/planets`;

export const get = async (url: string, data = {}) => {
  return fetch(url, {
    method: 'GET',
    ...data,
  });
};
