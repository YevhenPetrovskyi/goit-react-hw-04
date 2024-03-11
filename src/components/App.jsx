import { useEffect, useState } from 'react';
import { handleFetchPhotos } from '../API/articles-api';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal.jsx';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    imageSrc: '',
    imageAltDescription: '',
    imageDescription: '',
    imageAuthor: '',
    imageLikes: 0,
  });

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchPhotos = async () => {
      try {
        setError(false);
        setLoading(true);
        setLoadMoreBtn(false);
        const data = await handleFetchPhotos(query, page);
        if (data.total === 0) {
          setImages([]);
          setErrorMsg(
            "Sorry, I couldn't find pictures for your entry please try again."
          );
          setError(true);
        } else {
          setImages((prevImages) => prevImages.concat(data.results));
          setLoadMoreBtn(data.total_pages && data.total_pages !== page);
          if (page === 1) {
            toast.success(`${data.total} photos were found for your request`, {
              position: 'top-right',
            });
          }
        }
      } catch (error) {
        setErrorMsg(
          !error.response.data.errors
            ? error.message
            : error.response.data.errors
        );
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    if (searchQuery !== query) {
      setQuery(searchQuery);
      setPage(1);
      setImages([]);
    }
  };

  const handleSearchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleImageClick = (imageData) => {
    setModalData(imageData);
    openModal();
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <Toaster />
      {error && <ErrorMessage>{errorMsg}</ErrorMessage>}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {loading && <Loader />}
      {loadMoreBtn && <LoadMoreBtn onLoadMore={handleSearchNextPage} />}
      <ImageModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        {...modalData}
      />
    </div>
  );
}

export default App;
