import React from 'react';
import PropTypes from 'prop-types';

export default class TextCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: props.defaultText };
    this.textChange = this.textChange.bind(this);
  }

  componentDidUpdate(oldProps, oldState) {
    if (this.state.text.length > 3) {
      this.setState(oldState);
    }
  }

  textChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div>
        <textarea value={this.state.text} onChange={this.textChange} />
        <div>{this.state.text.length}</div>
      </div>
    );
  }
}

TextCount.propTypes = {
  defaultText: PropTypes.string.isRequired,
};
