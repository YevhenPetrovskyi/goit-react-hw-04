import axios from 'axios';

const API_URL = 'https://api.unsplash.com';
const ACCESS_KEY = 'IMgd-JZNb9BN6sDOuDvJqXDAPY6O_etmim3DLFJMLNM';

axios.defaults.baseURL = API_URL;

const searchParms = {
  client_id: ACCESS_KEY,
  query: '',
  page: 1,
  per_page: 20,
  orientation: 'landscape',
};

export const handleFetchPhotos = async (query, page) => {
  const res = await axios.get('/search/photos', {
    params: {
      ...searchParms,
      page,
      query,
    },
  });
  return res.data;
};
