
import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
  };

  modalContent = (id) => {
    this.props.onSelect(id);
  };
  render() {
    const { id, webformatURL } = this.props;
    return (
      <img
        src={webformatURL}
        alt=""
        className={s.ImageGalleryItem_image}
        onClick={() => this.modalContent(id)}
      />
    );
  }
}

export default ImageGalleryItem;