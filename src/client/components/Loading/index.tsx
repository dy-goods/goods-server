import * as React from 'react';

import './index.scss';

type IPros = {
  showFlag?: 'circle' | 'spinner' | 'test';
};

export default class Loading extends React.Component<IPros> {
  constructor(props: any) {
    super(props);
  }
  getDivList(count: number) {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(<div key={i} />);
    }
    return list;
  }
  render() {
    return (
      <div className="loading-wrapper">
        {(!this.props.showFlag || this.props.showFlag === 'circle') && (
          <div className="circle" v-show="showFlag === 1">
            {this.getDivList(12)}
          </div>
        )}

        {this.props.showFlag === 'spinner' && (
          <div className="spinner" v-show="showFlag === 2">
            {this.getDivList(12)}
          </div>
        )}

        {this.props.showFlag === 'test' && (
          <div className="test" v-show="showFlag === 3">
            {this.getDivList(3)}
          </div>
        )}
        <div className="hint">{this.props.children}</div>
      </div>
    );
  }
}
