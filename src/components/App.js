import React, { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './App.css';
import Spinner from './Loader/Loader';
import imageApi from './services/api';
import SearchBar from './SearchBar/SearchBar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Modal from './Modal/Modal.jsx';
import Button from './Button/Button.jsx';

class App extends Component {
  state = {
    searchbar: '',
    status: 'idle',
    result: [],
    isLoading: false,
    page: 1,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchbar;
    const nextQuery = this.state.searchbar;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (nextPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (prevQuery !== nextQuery) {
      this.setState({ result: [], status: 'pending' });
    }

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      imageApi
        .fetchImg(nextQuery, nextPage)
        .then(({ hits }) => {
          const images = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            },
          );
          if (images.length > 0) {
            this.setState(prevState => {
              return {
                result: [...prevState.result, ...images],
                status: 'resolved',
              };
            });
          } else {
            alert(`No any picture`);
            this.setState({ status: 'idle' });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  modalOpen = (moduleUrl, moduleAlt) => {
    this.setState({
      largeImageURL: moduleUrl,
      alt: moduleAlt,
    });
  };
  modalClose = () => {
    this.setState({ largeImageURL: '', alt: '' });
  };
  onFormSubmit = searchName => {
    this.setState({ searchbar: searchName, page: 1, result: [], error: null });
  };
  render() {
    const { result, status, error, alt, largeImageURL } = this.state;
    if (status === 'idle') {
      return <SearchBar submit={this.onFormSubmit} />;
    }
    if (status === 'pending') {
      return (
        <div>
          <SearchBar submit={this.onFormSubmit} />
          {result.length > 0 && <ImageGallery result={result} />}
          <Spinner />
        </div>
      );
    }
    if (status === 'rejected') {
      return <p>{error}</p>;
    }
    if (status === 'resolved') {
      return (
        <>
          <SearchBar submit={this.onFormSubmit} />
          <ImageGallery modalOpen={this.modalOpen} result={result} />
          <Button onClick={this.loadMore} />

          {largeImageURL && (
            <Modal
              largeImageURL={largeImageURL}
              alt={alt}
              onClick={this.modalClose}
            />
          )}
        </>
      );
    }
  }
}
export default App;
