import * as React from 'react';
import { inject, observer } from 'mobx-react';
import GoodsStore from '../../stores/goods';
import Loading from '../../components/Loading';
import './index.scss';

type IProps = {
  goodsStore: GoodsStore;
};
type IState = {
  isLoadingShow: boolean;
};

@inject('goodsStore')
@observer
export default class GoodsPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isLoadingShow: true,
    };
  }
  async componentDidMount() {
    this.setState({
      isLoadingShow: true,
    });
    await this.props.goodsStore.getGoodsList(1);
    this.setState({
      isLoadingShow: false,
    });
  }

  render() {
    const { isLoadingShow } = this.state;
    const { goodsList } = this.props.goodsStore;
    return isLoadingShow ? (
      <Loading />
    ) : (
      <div className="goods-page">
        <ul>
          {goodsList.length ? (
            goodsList.map((goods, index) => {
              return (
                <li key={index}>
                  <span className="test">{goods.videoUrl}</span>
                  <span className="test">{goods.stars}</span>
                  <span className="test">{goods.discount}</span>
                  <span className="test">{goods.buyCount}</span>
                  <span className="test">{goods.taobaoPrice}</span>
                  <span className="test">{goods.price}</span>
                  <span className="test">{goods.title}</span>
                  <span className="test">{goods.imgUrl}</span>
                  <span className="test">{goods.labels}</span>
                </li>
              );
            })
          ) : (
            <li className="empty">空</li>
          )}
        </ul>
      </div>
    );
  }
}
