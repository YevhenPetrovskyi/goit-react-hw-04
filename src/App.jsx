import axios from 'axios';
import { useEffect, useState } from 'react';

import SearchBar from './components/SearchBar/SearchBar';

import './App.css';

const API_URL = 'https://api.unsplash.com';
const ACCESS_KEY = 'IMgd-JZNb9BN6sDOuDvJqXDAPY6O_etmim3DLFJMLNM';

axios.defaults.baseURL = API_URL;

const searchParms = {
  client_id: ACCESS_KEY,
  query: 'car',
  page: 1,
  per_page: 18,
  orientation: 'landscape',
};

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState('dog');
  const [page, setPage] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('/search/photos', {
          params: {
            ...searchParms,
            page,
            query: searchWord,
          },
        });
        console.log(res);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <SearchBar />
    </div>
  );
}

export default App;
