import {
  AddGoodsInputType,
  AddGoodsOutputType,
  UpdateGoodsInputType,
} from '../types/goods';
import db from '../../models';
import * as uuid from 'uuid/v4';

const Goods = db.models.Goods;

import { GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { GraphQLString } from 'graphql/type/scalars';

export const addGoods = {
  type: AddGoodsOutputType,
  description: '添加商品',
  args: {
    input: {
      type: new GraphQLNonNull(AddGoodsInputType),
    },
  },
  resolve: async (_: any, args: GOODS.IAddArgs) => {
    const goods = args.input;
    await db.sync();
    // 同步所有已定义的模型到数据库中,即建立对应的表,必须先sync完，才能往表里添加行
    const id = uuid();
    await Goods.create({
      id,
      ...goods,
    });
    return {
      id,
    };
  },
};

export const updateGoods = {
  type: GraphQLBoolean,
  description: '修改商品',
  args: {
    input: {
      type: new GraphQLNonNull(UpdateGoodsInputType),
    },
  },
  resolve: async (_: any, args: GOODS.IUpdateInputArgs) => {
    const input = args.input;
    const goods = await Goods.findOne({
      where: {
        id: input.id,
      },
    });
    Reflect.deleteProperty(input, 'id');
    for (const key of Object.keys(input)) {
      goods[key] = (input as any)[key];
    }
    await goods.save();
    return true;
  },
};

export const deleteGoods = {
  type: GraphQLBoolean,
  description: '删除商品',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: '商品ID',
    },
  },
  resolve: async (
    _: any,
    args: {
      id: string;
    },
  ) => {
    const id = args.id;
    const goods = await Goods.findOne({
      where: {
        id,
      },
    });
    goods.isDeleted = 1;
    await goods.save();
    return true;
  },
};
