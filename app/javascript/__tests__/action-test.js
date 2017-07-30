jest
  .dontMock('../whinepad/components/actions')
  .dontMock('./wrap')
;

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Actions from '../whinepad/components/actions';
import Wrap from './wrap';

describe('クリック時の動作', () => {
  it('コールバック関数が呼ばれること', () => {
    const callback = jest.genMockFunction();
    const actions = ReactTestUtils.renderIntoDocument(
      <Wrap>
        <Actions onAction={callback} />
      </Wrap>
    );
    ReactTestUtils
      .scryRenderedDOMComponentsWithTag(actions, 'span')
      .forEach(span => ReactTestUtils.Simulate.click(span));

    const calls = callback.mock.calls;

    expect(calls.length).toEqual(3);
    expect(calls[0][0]).toEqual('info');
    expect(calls[1][0]).toEqual('edit');
    expect(calls[2][0]).toEqual('delete');
  })
});