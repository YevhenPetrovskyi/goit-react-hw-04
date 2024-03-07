import { useEffect, useState } from 'react';
import { handleFetchPhotos } from './articles-api';
import iziToast from 'izitoast';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

import 'izitoast/dist/css/iziToast.min.css';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = (query) => {
    setQuery((prevQuery) => (prevQuery !== query ? query : prevQuery));
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchPhotos = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await handleFetchPhotos(query, page);
        if (data.total === 0) {
          setImages([]);
          setErrorMsg(
            "Sorry, I couldn't find pictures for your entry please try again."
          );
          setError(false);
        } else {
          setImages((prevImages) => prevImages.concat(data.results));
          iziToast.success({
            message: `${data.total} photos were found for your request`,
            position: 'topRight',
          });
        }
      } catch (error) {
        setErrorMsg(
          !error.response.data.errors
            ? error.message
            : error.response.data.errors
        );
        setError(false);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [query, page]);

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage>{errorMsg}</ErrorMessage>}
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
    </div>
  );
}

export default App;
