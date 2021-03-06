import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
class ImageGallery extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    ).isRequired,
  };
  handleOpenModal = e => {
    if (e.target !== e.currentTarget) {
      this.props.onClick();
    }
  };
  render() {
    const { images, onSelect } = this.props;
    return (
      <ul
        onLoad={() => {
          this.props.scrollList();
        }}
        className={s.ImageGallery}
        onClick={this.handleOpenModal}
      >
        {images &&
          images.map(image => (
            <li key={image.id} className={s.ImageGalleryItem}>
              <ImageGalleryItem {...image} onSelect={onSelect} />
            </li>
          ))}
      </ul>
    );
  }
}
export default ImageGallery;