import * as React from 'react';
import './index.scss';
import * as classnames from 'classnames';

type IProps = {
  total: number; // total表示一共有多少页
  curr: number; // curr表示当前页
  count?: number; // count表示在底部最多显示多少页的导航,默认为5
  selectPage: (no: number) => void; // 设置curr
};
type IState = {};

export default class Paginator extends React.Component<IProps, IState> {
  private count: number = this.props.count ? this.props.count : 5;
  constructor(props: IProps) {
    super(props);
    this.state = {};
    this.selectPrevPage = this.selectPrevPage.bind(this);
    this.selectNextPage = this.selectNextPage.bind(this);
  }

  get start() {
    const remainder = Math.floor(this.count / 2);

    if (this.props.curr > this.count) {
      if (this.props.total - this.props.curr < this.count) {
        return this.props.total - this.count + 1;
      }
      return this.props.curr - remainder;
    }

    return 1;
  }
  get end() {
    let end =
      this.start + this.count < this.props.total
        ? this.start + this.count - 1
        : this.props.total;

    return end;
  }
  get offset() {
    const list = [];
    for (let i = this.start; i <= this.end; i++) {
      list.push(i);
    }
    return list;
  }
  selectPrevPage() {
    if (this.props.curr - 1 > 0) {
      this.props.selectPage(this.props.curr - 1);
    }
  }
  selectNextPage() {
    if (this.props.curr + 1 <= this.props.total) {
      this.props.selectPage(this.props.curr + 1);
    }
  }
  render() {
    return (
      this.props.total > 1 && (
        <div className="paginator">
          <ul>
            {this.start > 1 && (
              <li
                className="pg-item pg-item-first"
                onClick={() => this.props.selectPage(1)}
              >
                首页
              </li>
            )}
            <li
              className={classnames({
                'paginator-disable': this.props.curr <= 1,
                'pg-item': true,
                'pg-item-prev': true,
              })}
              onClick={this.selectPrevPage}
            >
              上一页
            </li>
            {this.offset.map(item => {
              return (
                <li
                  key={item}
                  className={classnames({
                    'pg-item': true,
                    'pg-item-curr': this.props.curr === item,
                  })}
                  onClick={() => this.props.selectPage(item)}
                >
                  {item}
                </li>
              );
            })}
            {this.end < this.props.total && (
              <li className="pg-item pg-item-no">...</li>
            )}
            {this.end < this.props.total && (
              <li
                className={classnames({
                  'pg-item': true,
                  'pg-item-curr': this.props.curr === this.props.total,
                })}
                onClick={() => this.props.selectPage(this.props.total)}
              >
                {this.props.total}
              </li>
            )}
            <li
              className={classnames({
                'pg-item': true,
                'pg-item-next': true,
                'paginator-disable': this.props.curr >= this.props.total,
              })}
              onClick={this.selectNextPage}
            >
              下一页
            </li>
          </ul>
        </div>
      )
    );
  }
}
