/* @flow */

import React from 'react';

class Wrap extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Wrap



describe('a suite', () => {
  it('is a spec', () => {
    "use strict";
    expect(1).toBe(1);
  });
});
