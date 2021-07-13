import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./Button.module.css";

class Button extends Component {
  static defaultProps = {
    name: "Load more",
  };
  static propTypes = {
    name: PropTypes.string,
    onPress: PropTypes.func.isRequired,
  };
  render() {
    const { onPress, name } = this.props;
    return (
      <button type="button" onClick={onPress} className={s.Button}>
        {name}
      </button>
    );
  }
}

export default Button;
