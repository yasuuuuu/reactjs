// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from './rating';
import Suggest from './suggest';

type FormInputFieldType = 'year' | 'suggest' | 'rating' | 'text' | 'input';

export type FormInputFieldValue = string | number;

export type FormInputField = {
  type: FormInputFieldType,
  defaultValue?: FormInputFieldValue,
  id?: string,
  options?: Array<string>,
  label?: string,
}


export default class FormInput extends Component {
  props: FormInputField;

  constructor(props) {
    super(props);
  }

  getValue() {
    return 'value' in this.refs.input
      ? this.refs.input.value
      : this.refs.input.getValue();
  }

  render() {
    const common = {
      id: this.props.id,
      ref: 'input',
      defaultValue: this.props.defaultValue,
    };

    switch (this.props.type) {
      case 'year':
        return (
          <input
            {...common}
            type="number"
            defaultValue={this.props.defaultValue || new Date().getFullYear()}
          />
        );
      case 'suggest':
        return <Suggest {...common} options={this.props.options} />;
      case 'rating':
        return (
          <Rating
            {...common}
            defaultValue={parseInt(this.props.defaultValue, 10)}
          />
        );
      case 'text':
        return <textarea {...common} />;
      default:
        return <input {...common} type="text" />;
    }
  }
}

FormInput.propTypes = {
  type: PropTypes.oneOf(['year', 'suggest', 'rating', 'text', 'input']),
  id: PropTypes.string,
  options: PropTypes.array,
  defaultValue: PropTypes.any,
};
