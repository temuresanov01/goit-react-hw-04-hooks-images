import React, { useEffect, useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './App.css';
import Spinner from './Loader/Loader';
import imageApi from './services/api';
import SearchBar from './SearchBar/SearchBar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Modal from './Modal/Modal.jsx';
import Button from './Button/Button.jsx';

export default function App() {
  const [searchbar, setSearchbar] = useState('');
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [modalUrl, setModalUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (searchbar.trim() === '') {
      return;
    }

    setStatus('pending');

    imageApi
      .fetchImg(searchbar, page)
      .then(({ hits }) => {
        const images = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        });
        if (images.length > 0) {
          setResult(state => [...state, ...images]);
          setStatus('resolved');
        } else {
          alert(`No any picture`);
          setStatus('idle');
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      })
      .finally(() => {
        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      });
  }, [page, searchbar]);

  const onFormSubmit = newSearch => {
    if (newSearch !== searchbar) {
      setResult([]);
      setPage(1);
      setSearchbar(newSearch);
    }
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
    setStatus('pending');
  };

  const modalOpen = (modalUrl, modalAlt) => {
    setModalUrl(modalUrl);
    setModalAlt(modalAlt);
  };
  const modalClose = () => {
    setModalUrl('');
    setModalAlt('');
  };

  return (
    <div className="App">
      <SearchBar submit={onFormSubmit} />
      <div>
        <ImageGallery modalOpen={modalOpen} result={result} />
        {status === 'resolved' && <Button onClick={loadMore} />}
      </div>
      {status === 'pending' && <Spinner />}
      {modalUrl && (
        <Modal largeImageURL={modalUrl} alt={modalAlt} onClick={modalClose} />
      )}
      {status === 'rejected' && <p>{error}</p>}
    </div>
  );
}
