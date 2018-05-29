import * as Seq from 'sequelize';
import { Sequelize } from 'sequelize';

export default function(sequelize: Sequelize) {
  const Goods = sequelize.define(
    'Goods',
    {
      id: {
        type: Seq.STRING(300),
        primaryKey: true,
      },
      videoUrl: Seq.STRING(300),
      stars: Seq.BIGINT,
      shareCount: Seq.BIGINT,
      buyCount: Seq.BIGINT,
      price: Seq.BIGINT,
      title: Seq.STRING(300),
      imgUrl: Seq.STRING(300),
      tkl: Seq.STRING(300),

      recommends: {
        type: Seq.STRING(300),
        defaultValue: '',
      },
      taobaoPrice: {
        type: Seq.BIGINT,
        defaultValue: 0,
      },
      discount: {
        type: Seq.FLOAT,
        defaultValue: 0,
      },
      labels: {
        type: Seq.STRING(300),
        defaultValue: '',
      },

      isDeleted: {
        type: Seq.BOOLEAN,
        defaultValue: false,
      },
      createdAt: Seq.BIGINT,
      updatedAt: Seq.BIGINT,
    },
    {
      timestamps: true,
    },
  );
  return Goods;
}
