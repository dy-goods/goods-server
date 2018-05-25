import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

type Props = {};

export default class Toast extends React.Component<Props, {}> {
  render() {
    return <div className="toast-content">{this.props.children}</div>;
  }
}

export function toast(content: string | Element, time?: number) {
  const div = document.createElement('div');
  time = time || 1000;
  const toastComponent = React.createElement(Toast, {}, content);
  div.className = 'toast toast-component';
  div.style.display = 'none';
  ReactDOM.render(toastComponent, div);
  document.body.appendChild(div);
  div.style.display = 'block';
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }, time);
}
