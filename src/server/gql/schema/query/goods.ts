import db from '../../models';
import { GraphQLInt } from 'graphql';
import { IGoodsSearchInput, GoodsSearchOutputType } from '../types/goods';
import { IGoods } from 'gql/models/goods';

const Goods = db.models.Goods;

export const goods: FieldConfig = {
  type: GoodsSearchOutputType,
  description: '商品信息',
  args: {
    pageNo: {
      type: GraphQLInt,
      description: '第几页',
    },
    pageSize: {
      type: GraphQLInt,
      description: '一页多少条目',
    },
  },
  resolve: async (_: any, args: IGoodsSearchInput) => {
    const { pageNo, pageSize } = args;
    const goods = await Goods.findAll<IGoods>({
      offset: (pageNo - 1) * pageSize,
      limit: pageSize,
      where: {
        isDelete: false,
      },
    });
    const totalCount: any = await Goods.findAll<number>({
      attributes: [[db.fn('COUNT', db.col('*')), 'totalCount']],
      where: {
        isDelete: false,
      },
    });
    return {
      page: {
        pageNo,
        pageSize,
        totalCount,
        totalPageCount: Math.ceil(totalCount / pageSize),
      },
      goods,
    };
  },
};
