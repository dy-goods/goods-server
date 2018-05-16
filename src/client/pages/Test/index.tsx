import * as React from 'react';
import Dialog from '../../components/Dialog';

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
        <Dialog />
        <h1>测试1</h1>
      </div>
    );
  }
}
