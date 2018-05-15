import * as React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './index.scss';

interface IProps {
  show?: boolean;
  noClose?: boolean;
  onClosed?: Function;
  element?: Element;
}

interface IState {
  show: boolean;
}

class Dialog extends React.Component<IProps, IState> {
  element: Element;
  static defaultProps = {
    show: false,
    portal: true,
    noClose: false,
  };
  constructor(props: IProps) {
    super(props);
    this.state = {
      show: props.show || false,
    };
    this.element = props.element || document.body;
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.show !== this.state.show) {
      this.setState({
        show: nextProps.show || false,
      });
    }
  }

  handleClose() {
    const { onClosed } = this.props;
    if (typeof onClosed === 'function') {
      onClosed();
    }
  }
  render() {
    const { noClose, children } = this.props;
    const { show } = this.state;
    return createPortal(
      <CSSTransition
        in={show}
        classNames="c-dialog-wrap"
        timeout={{
          enter: 0,
          exit: 250,
        }}
        mountOnEnter={true}
        unmountOnExit={true}
        onExited={() => this.handleClose()}
      >
        {() => (
          <div className="c-dialog-wrap" onClick={e => e.stopPropagation()}>
            <div className="c-dialog">
              {!noClose ? (
                <i
                  className="icon-close"
                  onClick={() => this.setState({ show: false })}
                />
              ) : null}
              {children}
            </div>
          </div>
        )}
      </CSSTransition>,
      this.element,
    );
  }
}

export default Dialog;
