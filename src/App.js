import React, { Component } from 'react';
import SearchBar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal';
import Button from './components/Button/Button';
import Spinner from './components/Spinner/Spinner';
import './App.css';

import fetchImages from './components/services/apiService';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    modalContent: '',
    isLoading: false,
    showModal: false,
  };

  // componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getData();
    }
  }

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };
  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  toggleLoading = () => {
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  };

  handleNextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  hadleChangeQuery = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
    });
  };

  handleScroll = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: 'smooth',
      });
    }, 800);
  };

  modalContentSet = itemId => {
    const { images } = this.state;
    const element = images.find(({ id }) => id === itemId);
    this.setState({ modalContent: element.largeImageURL });
  };

  getData = () => {
    const { searchQuery, page } = this.state;
    this.toggleLoading();
    fetchImages(searchQuery, page)
      .then(({ hits }) => {
        this.setState(({ images }) => {
          return { images: [...images, ...hits] };
        });
      })
      .then(this.handleScroll)
      .catch(error => console.log(error.message))
      .finally(this.toggleLoading);
  };

  render() {
    // console.log('App render');
    const { showModal, images, modalContent, isLoading } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.hadleChangeQuery} />

        {images.length > 0 && (
          <ImageGallery
            images={images}
            onClick={this.toggleModal}
            onItemClick={this.modalContentSet}
          />
        )}

        {showModal && <Modal image={modalContent} onClose={this.toggleModal} />}

        {isLoading && <Spinner />}

        {!isLoading && images.length >= 12 && (
          <Button name="Load more" onPress={this.handleNextPage} />
        )}
      </div>
    );
  }
}
export default App;
