import * as React from 'react';
import { inject, observer } from 'mobx-react';
import GoodsStore from '../../stores/goods';
import Loading from '../../components/Loading';
import { toast } from '../../components/Toast';
import Paginator from '../../components/Paginator';
import { alert } from '../../components/Alert';
import { createUpdateGoods } from './CreateUpdateGoods';
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
    this.searchGoods = this.searchGoods.bind(this);
  }
  componentDidMount() {
    this.searchGoods();
  }
  async searchGoods() {
    this.setState({
      isLoadingShow: true,
    });
    await this.props.goodsStore.getGoodsList();
    this.setState({
      isLoadingShow: false,
    });
  }

  async deleteGoods(id: string) {
    const ret = await this.props.goodsStore.deleteGoods(id);
    toast(`删除${ret ? '成功' : '失败'}`);
  }

  render() {
    const { isLoadingShow } = this.state;
    const { goodsList, pageInfo } = this.props.goodsStore;
    return isLoadingShow ? (
      <Loading />
    ) : (
      <div className="goods-page">
        <header className="goods-page-header">
          <div className="hint">抖友好物说后台页面</div>
        </header>
        <div className="goods-page-middle">
          <div className="goods-page-search">
            <div className="input">
              <img
                className="search"
                src={require('../../assets/imgs/svg/search.svg')}
                alt=""
              />
              <input
                type="text"
                readOnly
                placeholder="暂不支持自定义搜索，若为空则为搜索全部"
              />
            </div>
            <button className="search-goods" onClick={() => this.searchGoods()}>
              搜索
            </button>
            <button
              className="add-goods"
              onClick={() =>
                createUpdateGoods({
                  isCreateGoods: true,
                })
              }
            >
              添加商品
            </button>
          </div>
          <ul className="goods-list">
            <li>
              <span className="video-url">视频链接</span>
              <span className="stars">点赞数</span>
              <span className="discount">折扣</span>
              <span className="buy-count">购买数量</span>
              <span className="taobao-price">淘宝价格</span>
              <span className="price">价格</span>
              <span className="title">标题</span>
              <span className="img-url">图片链接</span>
              <span className="tkl">淘口令</span>
              <span className="babels">标签</span>
              <span className="handle">操作</span>
            </li>
            {goodsList.length ? (
              goodsList.map(goods => {
                return (
                  <li key={goods.id}>
                    <span className="video-url">{goods.videoUrl}</span>
                    <span className="stars">{goods.stars}</span>
                    <span className="discount">{goods.discount}</span>
                    <span className="buy-count">{goods.buyCount}</span>
                    <span className="taobao-price">{goods.taobaoPrice}</span>
                    <span className="price">{goods.price}</span>
                    <span className="title">{goods.title}</span>
                    <span className="img-url">{goods.imgUrl}</span>
                    <span className="tkl">{goods.tkl}</span>
                    <span className="babels">{goods.labels}</span>
                    <span className="handle">
                      <span
                        className="update-goods"
                        onClick={() =>
                          createUpdateGoods({
                            isCreateGoods: false,
                            goods,
                          })
                        }
                      >
                        修改
                      </span>
                      <span
                        className="delete-goods"
                        onClick={() =>
                          alert({
                            title: '删除商品',
                            onConfirmed: this.deleteGoods.bind(this, goods.id),
                            children: <div>你确认要删除这个商品吗?</div>,
                          })
                        }
                      >
                        删除
                      </span>
                    </span>
                  </li>
                );
              })
            ) : (
              <li className="goods-empty">
                <span className="text">没有商品</span>
              </li>
            )}
          </ul>
          <div className="goods-paginator">
            <Paginator
              total={pageInfo.totalPageCount}
              curr={pageInfo.pageNo}
              selectPage={pageNo => this.props.goodsStore.selectPage(pageNo)}
            />
            <div className="total-count">一共有{pageInfo.totalCount}条记录</div>
          </div>
        </div>
      </div>
    );
  }
}
