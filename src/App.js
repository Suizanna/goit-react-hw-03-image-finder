import React, { Component } from 'react';
import SearchBar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal';
import Button from './components/Button/Button';
import Spinner from './components/Spinner/Spinner';
import { ToastContainer } from 'react-toastify';
import './App.css';
import apiService from './components/services/apiService';

// const Status = {   //у Репеты react-21-22 урок 6
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };
class App extends Component {
  state = {
    searchQuery: '',
    error: null,
    status: 'idle',
    page: 1,
    images: [],
    modalContent: '',
    showModal: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });
      this.renderImages();
    }
  }
  renderImages = async () => {
    const { searchQuery, page } = this.state;
    return apiService
      .fetchImages(searchQuery, page)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error }));
  };
  //при onSubmit на <SearchBar/>
  // очищаем стеит и записываем новый searchQuery который ввели
  hadleChangeQuery = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    } else {
      this.setState({
        // searchQuery: query, //this.setState({ searchQuery }) не нужен
        searchQuery: '',
        page: 1,
        images: [],
      });
    }
    this.setState({ searchQuery }); //и тогда не нужен
  };
  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };
  modalContentSet = itemId => {
    const { images } = this.state;
    const element = images.find(({ id }) => id === itemId);
    this.setState({ modalContent: element.largeImageURL });
  };
  //кнопка загрузить еще
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  render() {
    // console.log('App render');
    const { showModal, images, modalContent, status } = this.state;
    const pending = status === 'pending';
    const resolved = status === 'resolved';
    return (
      <div className="App">
        <SearchBar onSubmit={this.hadleChangeQuery} />
        {images.length > 0 && (
          <ImageGallery
            scrollList={this.handleScroll}
            images={images}
            onClick={this.toggleModal}
            onSelect={this.modalContentSet}
          />
        )}
        {showModal && <Modal image={modalContent} onClose={this.toggleModal} />}
        {pending && <Spinner />}
        {resolved && images.length >= 12 && (
          <Button name="Load more" onPress={this.onLoadMore} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
export default App;
