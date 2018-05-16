import * as Seq from 'sequelize';
import { Sequelize } from 'sequelize';

export interface IGoods {
  id: string;
  videoUrl: string;
  stars: number; // 点赞数
  discount: number; // 折扣
  buyCount: number; // 购买数量
  taobaoPrice: number;
  price: number; // 以分为单位
  title: string;
  imgUrl: string;
  labels: string; // 标签, eg好玩到爆，省事的气球车
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
}

export default function(sequelize: Sequelize) {
  const Goods = sequelize.define(
    'Goods',
    {
      id: {
        type: Seq.STRING(50),
        primaryKey: true,
      },
      videoUrl: Seq.STRING(100),
      stars: Seq.BIGINT,
      discount: Seq.FLOAT,
      buyCount: Seq.BIGINT,
      taobaoPrice: Seq.BIGINT,
      price: Seq.BIGINT,
      title: Seq.STRING(100),
      imgUrl: Seq.STRING(100),
      labels: Seq.STRING(100),
      isDeleted: Seq.BOOLEAN,
      createdAt: Seq.BIGINT,
      updatedAt: Seq.BIGINT,
    },
    {
      timestamps: true,
    },
  );
  return Goods;
}
