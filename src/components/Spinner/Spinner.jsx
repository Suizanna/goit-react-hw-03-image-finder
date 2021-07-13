import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import s from './Spinner.module.css';

class Spinner extends Component {
  render() {
    return (
      <div className={s.Spinner}>
       <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={0}
      />
    </div>
  );
}
}

export default Spinner;
