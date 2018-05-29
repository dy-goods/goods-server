import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import Alert from '../../../components/Alert';
import { toast } from '../../../components/Toast';
import stores from '../../../stores';
import { priceText } from '../../../utils';

type IProps = {
  isCreateGoods: boolean;
  onClosed?: () => void;
  onCompleted?: () => void;
  goods?: GOODS.IUpdateInput;
};
type IState = {
  isCreateUpdateing: boolean;
  isAlertShow: boolean;
  form: GOODS.IAddInput;
};

export default class CreateUpdateGoods extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const goods = (this.props.goods || {}) as GOODS.IUpdateInput;
    const _getPrice = (value?: number) => {
      return Number(priceText(value || 0, '')) || 0;
    };
    this.state = {
      isCreateUpdateing: false,
      isAlertShow: true,
      form: {
        videoUrl: goods.videoUrl || '',
        stars: goods.stars || 0, // 点赞数
        shareCount: goods.shareCount || 0,
        buyCount: goods.buyCount || 0, // 购买数量
        price: _getPrice(goods.price || 0), // 以分为单位
        title: goods.title || '',
        imgUrl: goods.imgUrl || '',
        tkl: goods.tkl || '',

        recommends: goods.recommends || '',
        discount: goods.discount || 0, // 折扣
        taobaoPrice: _getPrice(goods.taobaoPrice || 0),
        labels: goods.labels || '', // 标签, eg好玩到爆，省事的气球车
      },
    };
    this.updateGoods = this.updateGoods.bind(this);
    this.createGoods = this.createGoods.bind(this);
  }
  getError() {
    const {
      videoUrl,
      stars,
      shareCount,
      buyCount,
      price,
      title,
      imgUrl,
      tkl,
    } = this.state.form;
    return !(
      videoUrl &&
      stars &&
      shareCount &&
      buyCount &&
      price &&
      title &&
      imgUrl &&
      tkl
    );
  }
  transformGoods() {
    const form = this.state.form as {
      [key: string]: any;
    };
    const keys = Object.keys(form);
    for (const key of keys) {
      if (['stars', 'shareCount', 'buyCount', 'discount'].includes(key)) {
        form[key] = Number(form[key]);
      }
      if (['price', 'taobaoPrice'].includes(key)) {
        form[key] = Number(form[key]) * 100;
      }
      this.setState({
        form: form as any,
      });
    }
  }
  async createGoods() {
    this.setState({
      isCreateUpdateing: true,
    });
    this.transformGoods();
    const ret = await stores.goodsStore.addGoos(this.state.form);
    toast(`添加${ret ? '成功' : '失败'}`);
    if (ret) {
      this.setState({
        isCreateUpdateing: false,
      });
      await stores.goodsStore.getGoodsList();
    }
  }
  async updateGoods() {
    if (!this.props.goods) {
      return;
    }
    this.setState({
      isCreateUpdateing: true,
    });
    this.transformGoods();
    const ret = await stores.goodsStore.updateGoods({
      id: this.props.goods.id,
      ...this.state.form,
    });
    ret &&
      this.setState({
        isCreateUpdateing: false,
      });
    toast(`修改${ret ? '成功' : '失败'}`);
  }
  setGoodsAttr(value: any, attr: string) {
    const { form } = this.state;
    (form as any)[attr] = value;
    this.setState({
      form,
    });
  }
  render() {
    const { isCreateGoods } = this.props;
    return (
      <Alert
        show={this.state.isAlertShow}
        title={isCreateGoods ? '新增商品' : '修改商品资料'}
        confirmText={isCreateGoods ? '确认新增商品' : '确认修改'}
        onConfirmed={isCreateGoods ? this.createGoods : this.updateGoods}
        confirmDisabled={this.state.isCreateUpdateing || !!this.getError()}
        onClosed={() => this.props.onClosed && this.props.onClosed()}
      >
        <div className="create-update-goods">
          <ul className="list">
            <li className="test">
              <div>视频链接</div>
              <input
                type="text"
                placeholder="请输入七牛云视频链接"
                value={this.state.form.videoUrl}
                onChange={e => this.setGoodsAttr(e.target.value, 'videoUrl')}
              />
            </li>
            <li className="test">
              <div>点赞数</div>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.stars || ''}
                onChange={e => this.setGoodsAttr(e.target.value, 'stars')}
              />
            </li>
            <li className="test">
              <div>分享数量</div>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.shareCount || ''}
                onChange={e => this.setGoodsAttr(e.target.value, 'shareCount')}
              />
            </li>
            <li className="test">
              <div>购买数量</div>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.buyCount || ''}
                onChange={e => this.setGoodsAttr(e.target.value, 'buyCount')}
              />
            </li>
            <li className="test">
              <div>价格</div>
              <input
                type="text"
                placeholder="请输入, eg: 1.11"
                value={this.state.form.price || ''}
                onChange={e => this.setGoodsAttr(e.target.value, 'price')}
              />
            </li>
            <li className="test">
              <div>标题</div>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.title}
                onChange={e => this.setGoodsAttr(e.target.value, 'title')}
              />
            </li>
            <li className="test">
              <div>图片链接</div>
              <input
                type="text"
                placeholder="请输入七牛云图片链接"
                value={this.state.form.imgUrl}
                onChange={e => this.setGoodsAttr(e.target.value, 'imgUrl')}
              />
            </li>
            <li className="test">
              <div>淘口令</div>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.tkl}
                onChange={e => this.setGoodsAttr(e.target.value, 'tkl')}
              />
            </li>

            <li className="test">
              <div className="optional">推荐语</div>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.recommends || ''}
                onChange={e => this.setGoodsAttr(e.target.value, 'recommends')}
              />
            </li>
            <li className="test">
              <div className="optional">淘宝价格</div>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.taobaoPrice || ''}
                onChange={e => this.setGoodsAttr(e.target.value, 'taobaoPrice')}
              />
            </li>
            <li className="test">
              <div className="optional">折扣</div>
              <input
                type="text"
                placeholder="请输入,eg: 6.6"
                value={this.state.form.discount || ''}
                onChange={e => this.setGoodsAttr(e.target.value, 'discount')}
              />
            </li>
            <li className="test">
              <div className="optional">标签</div>
              <input
                type="text"
                placeholder="请输入,eg: 好玩到爆,省事的气球车(以英文逗号分隔)"
                value={this.state.form.labels || ''}
                onChange={e => this.setGoodsAttr(e.target.value, 'labels')}
              />
            </li>
          </ul>
        </div>
      </Alert>
    );
  }
}

export function createUpdateGoods(props: IProps) {
  const div = document.createElement('div');
  const ele = React.createElement(
    CreateUpdateGoods,
    {
      ...props,
      onClosed() {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
      },
    },
    null,
  );
  ReactDOM.render(ele, div);
  document.body.appendChild(div);
}
