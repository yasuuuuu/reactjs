jest
  .dontMock('../whinepad/components/button')
  .dontMock('classnames')
;

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Button from '../whinepad/components/button';

describe('Buttonコンポーネントの描画', () => {
  it('<a>または<button>を描画します', () => {
    const button = ReactTestUtils.renderIntoDocument(
      <div>
        <Button>
          こんにちは
        </Button>
      </div>
    );
    expect(ReactDOM.findDOMNode(button).children[0].nodeName).toEqual('BUTTON');

    const a = ReactTestUtils.renderIntoDocument(
      <div>
        <Button href="#">
          こんにちは
        </Button>
      </div>
    );
    expect(ReactDOM.findDOMNode(a).children[0].nodeName).toEqual('A');
  });

  it('カスタムのCSSクラスを指定できます', () => {
    const button = ReactTestUtils.renderIntoDocument(
      <div>
        <Button className="good bye">
          こんにちは
        </Button>
      </div>
    );
    const buttonNode = ReactDOM.findDOMNode(button).children[0];
    expect(buttonNode.getAttribute('class')).toEqual('Button good bye');
  })
});