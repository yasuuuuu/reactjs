// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

type Props = {
  defaultValue: number,
  readonly: boolean,
  max: number,
}

type State = {
  rating: number,
  tmpRating: number,
}

export default class Rating extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.getValue = this.getValue.bind(this);
    this.setTemp = this.setTemp.bind(this);
    this.setRating = this.setRating.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setRating(nextProps.defaultValue);
  }

  getValue() {
    return this.state.rating;
  }

  setTemp(rating) {
    this.setState({ tmpRating: rating });
  }

  setRating(rating) {
    this.setState({
      tmpRating: rating,
      rating,
    });
  }

  reset() {
    this.setTemp(this.state.rating);
  }

  render() {
    const stars = [];
    for (let i = 1; i <= this.props.max; i++) {
      stars.push(
        <span
          className={ i <= this.state.tmpRating ? 'RatingOn' : null }
          key={i}
          onClick={ !this.props.readonly && this.setRating.bind(null, i) }
          onMouseOver={ !this.props.readonly && this.setTemp.bind(null, i) }
        >
          &#9734;
        </span>
      );
    }

    return (
      <div
        className={classNames({
          Rating: true,
          RatingReadonly: this.props.readonly,
        })}
        onMouseOut={this.reset}
      >
        {stars}
        {this.props.readonly || !this.props.id
          ? null : <input
            type="hidden"
            id={this.props.id}
            value={this.state.rating}
          />}
      </div>
    );
  }
}

Rating.propTypes = {
  defaultValue: PropTypes.number,
  readonly: PropTypes.bool,
  max: PropTypes.number,
};

Rating.defaultProps = {
  defaultValue: 0,
  max: 5,
};
