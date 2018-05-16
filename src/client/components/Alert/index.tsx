import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { bindMethod } from '../../utils';
import Dialog from '../Dialog';
import './index.scss';
import * as classnames from 'classnames';

export type AlertProps = {
  immediate?: boolean; // 是否是即时性的，即由 alert() 产生
  className?: string;
  show?: boolean;
  title?: string;
  /**
   * 在间隔的秒数之后自动关闭
   */
  autoClose?: number;
  /**
   * 按下确定按钮的时候自动关闭弹窗，默认为 true
   */
  confirmAsClose?: boolean;
  /**
   * 按下取消按钮的时候自动关闭弹窗，默认为 true
   */
  cancelAsClose?: boolean;
  /**
   * 点击弹窗内关闭按钮
   */
  onClosed?: (alert: Alert) => void | Promise<void>;
  /**
   * 点击弹窗内确认按钮
   */
  onConfirmed?: (alert: Alert) => void | Promise<void>;
  /**
   * 点击弹窗内取消按钮
   */
  onCanceled?: (alert: Alert) => void | Promise<void>;
  /**
   * 确认按钮的文字
   */
  confirmText?: React.ReactNode;
  /**
   * 取消按钮的文字
   */
  cancelText?: React.ReactNode;
  noClose?: boolean;
  noConfirm?: boolean;
  noCancel?: boolean;
  noButtons?: boolean;
  /**
   * 禁用确认按钮
   */
  confirmDisabled?: boolean;
  additionalButton?: React.ReactNode;
  /**
   * @description 自定义内容
   */
  customContent?: boolean;
  element?: Element;
};

type State = {
  show: boolean;
  countDown: number;
};

export default class Alert extends React.Component<AlertProps, State> {
  autoCloseInterval: number;

  static defaultProps = {
    show: false,
    portal: true,
    title: '提示',
    confirmAsClose: true,
    cancelAsClose: true,
  };

  constructor(props: AlertProps) {
    super(props);
    this.state = {
      show: props.show || false,
      countDown: 0,
    };
    bindMethod(this, ['close', 'confirm', 'cancel']);
  }

  componentDidMount() {
    let { immediate, autoClose } = this.props;
    if (immediate) {
      this.setState({
        show: true,
      });
    }
    if (autoClose) {
      let countDown = autoClose;
      this.setState({
        countDown,
      });
      this.autoCloseInterval = window.setInterval(() => {
        countDown--;
        if (countDown <= 0) {
          this.close();
          window.clearInterval(this.autoCloseInterval);
        } else {
          this.setState({
            countDown,
          });
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    if (this.autoCloseInterval) {
      window.clearInterval(this.autoCloseInterval);
    }
  }

  componentWillReceiveProps(nextProps: AlertProps) {
    if (nextProps.show !== this.state.show) {
      this.setState({
        show: nextProps.show || false,
      });
    }
  }

  close() {
    this.setState({
      show: false,
    });
  }

  async confirm() {
    const { onConfirmed, confirmAsClose } = this.props;
    if (onConfirmed) {
      await onConfirmed(this);
    }
    if (confirmAsClose) {
      this.close();
    }
  }

  async cancel() {
    const { onCanceled, cancelAsClose } = this.props;
    if (onCanceled) {
      await onCanceled(this);
    }
    if (cancelAsClose) {
      this.close();
    }
  }

  renderButtons() {
    const {
      noButtons,
      noConfirm,
      noCancel,
      confirmText,
      cancelText,
      confirmDisabled = false,
      additionalButton,
      autoClose,
    } = this.props;
    const { countDown } = this.state;

    if (noButtons) {
      return null;
    }

    return (
      <div className="btn-group">
        {!noCancel ? (
          <button className="btn cancel" onClick={this.cancel}>
            {cancelText || '取消'}
          </button>
        ) : null}
        {additionalButton}
        {!noConfirm ? (
          <button
            className="btn confirm"
            onClick={this.confirm}
            disabled={confirmDisabled}
          >
            {confirmText || '确认'}
            {autoClose ? `(${countDown})` : null}
          </button>
        ) : null}
      </div>
    );
  }

  render() {
    const { show } = this.state;
    const {
      element,
      title,
      children,
      noClose,
      onClosed,
      customContent,
    } = this.props;
    return (
      <Dialog
        show={show}
        element={element}
        noClose={noClose}
        onClosed={onClosed}
      >
        <div
          className={classnames(['c-dialog-alert', this.props.className || ''])}
        >
          {title ? (
            <div className="header">
              <span className="title">{this.props.title}</span>
            </div>
          ) : null}
          {customContent ? children : <div className="content">{children}</div>}
          {this.renderButtons()}
        </div>
      </Dialog>
    );
  }
}

export function alert(props: AlertProps & { children?: React.ReactNode }) {
  let element: Element | null = document.createElement('div');
  document.body.appendChild(element);

  const { onClosed } = props;
  props = Object.assign({}, props, {
    immediate: true,
    element,
    onClosed: () => {
      if (typeof onClosed === 'function') {
        onClosed(this);
      }
      if (element) {
        document.body.removeChild(element);
        element = null;
      }
    },
  });
  ReactDOM.render(<Alert {...props}>{props.children}</Alert>, element);
  return element;
}
