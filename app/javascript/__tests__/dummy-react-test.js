import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

describe('ボタンの描画', () => {
  it('クリックされると文字列が変化します', () => {
    const button = ReactTestUtils.renderIntoDocument(
      <button onClick={ev => ev.target.innerHTML = 'さようなら'}>
        こんにちは
      </button>
    );
    expect(ReactDOM.findDOMNode(button).textContent).toEqual('こんにちは');
  });
});
