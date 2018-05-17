import * as Seq from 'sequelize';
import { Sequelize } from 'sequelize';

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
