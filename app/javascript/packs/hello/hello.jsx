import React from 'react';
import PropTypes from 'prop-types';

export default class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.name = 'David';
  }

  render() {
    return (
      <div>Hello {this.props.name}</div>
    );
  }
}

Hello.propTypes = {
  name: PropTypes.string.isRequired,
};
