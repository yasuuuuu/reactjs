import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './button';

export default class Dialog extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    document.body.classList.remove('DialogModalOpen')
  }

  componentDidMount() {
    if (this.props.modal) {
      document.body.classList.add('DialogModalOpen')
    }
  }

  render() {
    return (
      <div className={this.props.modal ? 'Dialog DialogModal' : 'Dialog'}>
        <div className={this.props.modal ? 'DialogModalwrap' : null}>
          <div className="DialogHeader">{this.props.header}</div>
          <div className="DialogBody">{this.props.children}</div>
          <div className="DialogFooter">
            {this.props.hasCancel
              ? <span
                className="DialogDismiss"
                onClick={this.props.onAction.bind(this, 'dismiss')}>
                キャンセル
              </span>
              : null
            }
            <Button
              onClick={
                this.props.onAction.bind(this, this.props.hasCancel
                  ? 'confirm'
                  : 'dismiss')
              }
            >
              {this.props.confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Dialog.propTypes = {
  header: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  modal: PropTypes.bool,
  onAction: PropTypes.func,
  hasCancel: PropTypes.bool,
};

Dialog.defaultProps = {
  confirmLabel: 'OK',
  modal: false,
  onAction: () => {},
  hasCancel: true
};
