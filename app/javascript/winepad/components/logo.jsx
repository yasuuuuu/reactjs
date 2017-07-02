import React from 'react';

export default class Logo extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }

  render() {
    return <div className="Logo" />;
  }
}
