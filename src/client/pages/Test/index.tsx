import * as React from 'react';

import './index.scss';

type IProps = {};
type IState = {};

export default class TestPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="test-page">
        <h1>测试</h1>
      </div>
    );
  }
}
