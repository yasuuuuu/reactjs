import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from './rating';


export default class Form extends Component {
  constructor(props) {
    super(props);
  }

  getDate() {
    let data = {};
    this.props.fields.forEach(field =>
      data[field.id] = this.refs[field.id].getValue()
    );
    return data;
  }

  render() {
    return(
      <form className="Form">
        {this.props.fields.map(field => {
          const prefilled = this.props.initialData && this.props.initialData[field.id];
          if (!this.props.readonly) {
            return (
              <div className="FormRow" key={field.id}>
                <label className="FormLabel" htmlFor={field.id}>{field.label}:</label>
                <FormInput {...field} ref={field.id} defaultValue={prefilled} />
              </div>
            );
          }
          if (!prefilled) {
            return null;
          }
          return (
            <div className="FormRow" key={field.id}>
              <span className="FormLabel">{field.label}:</span>
              {
                field.type === 'rating'
                  ? <Rating readonly={true} defaultValue={parseInt(prefilled, 10)}/>
                  : <div>{prefilled}</div>
              }
            </div>
          );
        })}
      </form>
    )
  }
}

Form.propTypes = {
  fields: PropTYpes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropeTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  initialData: PropTypes.object,
  readonly: PropTypes.bool,
};