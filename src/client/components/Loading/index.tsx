import * as React from 'react';

import './index.scss';

export default class Loading extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className="loading-wrapper">
        <i className="icon-loading" />
        <div className="hint">{this.props.children || '数据加载中'}</div>
      </div>
    );
  }
}
