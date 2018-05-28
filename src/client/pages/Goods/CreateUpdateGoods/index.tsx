import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import Alert from '../../../components/Alert';
import { toast } from '../../../components/Toast';
import stores from '../../../stores';

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
    this.state = {
      isCreateUpdateing: false,
      isAlertShow: true,
      form: {
        videoUrl: goods.videoUrl || '',
        stars: goods.stars || 0, // 点赞数
        discount: goods.discount || 0, // 折扣
        buyCount: goods.buyCount || 0, // 购买数量
        taobaoPrice: goods.taobaoPrice || 0,
        price: goods.price || 0, // 以分为单位
        title: goods.title || '',
        imgUrl: goods.imgUrl || '',
        labels: goods.labels || '', // 标签, eg好玩到爆，省事的气球车
        tkl: goods.tkl || '',
      },
    };
    this.updateGoods = this.updateGoods.bind(this);
    this.createGoods = this.createGoods.bind(this);
  }
  getError() {
    const {
      videoUrl,
      stars,
      discount,
      buyCount,
      taobaoPrice,
      price,
      title,
      imgUrl,
      labels,
      tkl,
    } = this.state.form;
    return !(
      videoUrl &&
      stars &&
      discount &&
      buyCount &&
      taobaoPrice &&
      price &&
      title &&
      imgUrl &&
      tkl &&
      labels
    );
  }
  async createGoods() {
    this.setState({
      isCreateUpdateing: true,
    });
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
              <span>视频链接</span>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.videoUrl}
                onChange={e => this.setGoodsAttr(e.target.value, 'videoUrl')}
              />
            </li>
            <li className="test">
              <span>点赞数</span>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.stars || ''}
                onChange={e =>
                  this.setGoodsAttr(Number(e.target.value), 'stars')
                }
              />
            </li>
            <li className="test">
              <span>折扣</span>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.discount || ''}
                onChange={e =>
                  this.setGoodsAttr(Number(e.target.value), 'discount')
                }
              />
            </li>
            <li className="test">
              <span>购买数量</span>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.buyCount || ''}
                onChange={e =>
                  this.setGoodsAttr(Number(e.target.value), 'buyCount')
                }
              />
            </li>
            <li className="test">
              <span>淘宝价格</span>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.taobaoPrice || ''}
                onChange={e =>
                  this.setGoodsAttr(Number(e.target.value), 'taobaoPrice')
                }
              />
            </li>
            <li className="test">
              <span>价格，以分为单位</span>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.price || ''}
                onChange={e =>
                  this.setGoodsAttr(Number(e.target.value), 'price')
                }
              />
            </li>
            <li className="test">
              <span>标题</span>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.title}
                onChange={e => this.setGoodsAttr(e.target.value, 'title')}
              />
            </li>
            <li className="test">
              <span>图片链接</span>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.imgUrl}
                onChange={e => this.setGoodsAttr(e.target.value, 'imgUrl')}
              />
            </li>
            <li className="test">
              <span>淘口令</span>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.tkl}
                onChange={e => this.setGoodsAttr(e.target.value, 'tkl')}
              />
            </li>
            <li className="test">
              <span>标签, eg好玩到爆，省事的气球车</span>
              <input
                type="text"
                placeholder="请输入"
                value={this.state.form.labels}
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
