import db from '../../models';
import { GraphQLInt } from 'graphql';
import { GoodsSearchOutputType } from '../types/goods';

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
  resolve: async (_: any, args: GOODS.ISearchInput) => {
    const { pageNo, pageSize } = args;
    const goods = await Goods.findAll<GOODS.IGoodsType>({
      offset: (pageNo - 1) * pageSize,
      limit: pageSize,
      where: {
        isDeleted: false,
      },
    });
    const totalCount: any = await Goods.findAll<number>({
      attributes: [[db.fn('COUNT', db.col('*')), 'totalCount']],
      where: {
        isDeleted: false,
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
