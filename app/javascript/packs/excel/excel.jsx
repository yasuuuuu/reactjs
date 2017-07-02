import React from 'react';
import PropTypes from 'prop-types';

export default class Excel extends React.Component {
  constructor(props) {
    super(props);
    this.preSearchData = null;
    this.log = [];
    this.logSetState = this.logSetState.bind(this);
    this.sort = this.sort.bind(this);
    this.showEditor = this.showEditor.bind(this);
    this.save = this.save.bind(this);
    this.tds = this.tds.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.search = this.search.bind(this);
    this.replay = this.replay.bind(this);
    this.download = this.download.bind(this);
    this.state = {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null,
      search: false,
    };
  }

  componentDidMount() {
    document.onkeydown = (e) => {
      if(e.altKey && e.shiftKey && e.keyCode === 82) {
        this.replay();
      }
    }
  }

  replay() {
    if(this.log.length === 0) {
      console.log('ステートが記録されていません');
      return;
    }
    let idx = 1;
    const interval = setInterval(() => {
      idx++;
      if(idx === this.log.length - 1) {
        clearInterval(interval);
      }
      this.setState(this.log[idx]);
    }, 1000);
  }

  logSetState(newState) {
    this.log.push(JSON.parse(JSON.stringify(
      this.log.length === 0 ? this.state : newState
    )));
    this.setState(newState);
  }

  sort(e) {
    const column = e.target.cellIndex;
    const data = Array.from(this.state.data);
    const descending = this.state.sortby === column && !this.state.descending;
    data.sort((a, b) =>
      (descending ? (a[column] < b[column] ? 1 : -1) : (a[column] > b[column] ? 1 : -1))
    );
    this.logSetState({
      data,
      sortby: column,
      descending
    });
  }

  showEditor(e) {
    this.logSetState({ edit: {
      row: parseInt(e.target.dataset.row, 10),
      cell: e.target.cellIndex,
    } });
  }

  save(e) {
    e.preventDefault();
    const input = e.target.firstChild;
    const data = Array.from(this.state.data);
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.logSetState({
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

  toggleSearch() {
    if(this.state.search) {
      this.logSetState({
        data: this.preSearchData,
        search: false,
      })
    } else {
      this.preSearchData = this.state.data;
      this.logSetState({
        search: true,
      })
    }
  }

  search(e) {
    const needle = e.target.value.toLowerCase();

    if(!needle) {
      this.logSetState({
        data: this.preSearchData,
      });
      return;
    }

    const idx = e.target.dataset.idx;
    const searchdata = this.preSearchData.filter((row) =>
      row[idx].toString().toLowerCase().indexOf(needle) > -1
    );
    this.logSetState({data: searchdata});
  }

  renderSearch() {
    if(!this.state.search) {
      return null;
    }

    const tds = this.props.headers.map((_ignore, idx) =>
      <td key={idx}><input type="text" data-idx={idx} /></td>
    );
    return(
      <tr onChange={this.search}>
        {tds}
      </tr>
    );
  }

  download(format, e) {
  }

  renderToolbar() {
    return (
      <div className="toolbar">
        <button onClick={this.toggleSearch} className="toolbar">検索</button>
        <a onClick={this.download('json')} href="data.json">JSONで保存</a>
        <a onClick={this.download('csv')} href="data.csv">CSVで保存</a>
      </div>
    )
  }

  renderTable() {
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
        {this.renderSearch()}
        </thead>
        <tbody onDoubleClick={this.showEditor}>
        {trs}
        </tbody>
      </table>
    );
  }

  render() {
    return(
      <div>
        {this.renderToolbar()}
        {this.renderTable()}
      </div>
    );
  }
}

Excel.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string.isRequired),
  initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired)),
};
