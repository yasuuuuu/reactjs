import React from 'react';
import PropTypes from 'prop-types';

export default class Excel extends React.Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.showEditor = this.showEditor.bind(this);
    this.save = this.save.bind(this);
    this.tds = this.tds.bind(this);
    this.state = {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null,
    };
  }

  sort(e) {
    const column = e.target.cellIndex;
    const data = Array.from(this.state.data);
    const descending = this.state.sortby === column && !this.state.descending;
    data.sort((a, b) =>
      (descending ? (a[column] < b[column] ? 1 : -1) : (a[column] > b[column] ? 1 : -1))
    );
    this.setState({
      data,
      sortby: column,
      descending
    });
  }

  showEditor(e) {
    this.setState({ edit: {
      row: parseInt(e.target.dataset.row, 10),
      cell: e.target.cellIndex,
    } });
  }

  save(e) {
    e.preventDefault();
    const input = e.target.firstChild;
    const data = Array.from(this.state.data);
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({
      edit: null,
      data,
    });
  }

  tds(row, rowidx) {
    return row.map((cell, idx) => {
      let content = cell;
      if (this.state.edit && this.state.edit.row === rowidx && this.state.edit.cell === idx) {
        content = <form onSubmit={this.save}><input type='text' defaultValue={content} /></form>;
      }
      return <td key={idx} data-row={rowidx}>{content}</td>;
    });
  }

  render() {
    const ths = this.props.headers.map((title, idx) => {
      if (this.state.sortby === idx) {
        title += this.state.descending ? ' \u2191' : ' \u2193';
      }
      return <th key={idx}>{title}</th>;
    });

    const trs = this.state.data.map((row, rowidx) =>
      <tr key={rowidx}>
        {this.tds(row, rowidx)}
      </tr>,
    );

    return (
      <table>
        <thead onClick={this.sort}>
          <tr>
            {ths}
          </tr>
        </thead>
        <tbody onDoubleClick={this.showEditor}>
          {trs}
        </tbody>
      </table>
    );
  }
}

Excel.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string.isRequired),
  initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired)),
};
