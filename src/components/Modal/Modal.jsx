import React, { Component } from 'react';
import { createPortal } from "react-dom"; //это метод для модалки
import PropTypes from "prop-types";
import s from "./Modal.module.css";


const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  //метод очистки слушателей, таймеры, HTTP-запросов и т д
  componentWillUnmount() {
       console.log('Modal componentWillUnmount');
       window.removeEventListener('keydown', this.handleKeyDown);
  }
 handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('Нажали ESC, нужно закрыть модалку');
      this.props.onClose();
    }
  };

   handleBackdropClick= event => {
    // console.log('Кликнули в оверлей');

    // console.log('currentTarget: ', event.currentTarget);
    // console.log('target: ', event.target);

    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    const { image } = this.props;
    
      return createPortal(
        <div className={s.Overlay} onClick={this.handleBackdropClick}>
            <div className={s.Modal}>
              <img src={image} alt="" />
            </div>
       </div>,
          modalRoot
    );
  }

}