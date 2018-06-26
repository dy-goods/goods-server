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
      description: '第几页，默认值是1',
    },
    pageSize: {
      type: GraphQLInt,
      description: '一页多少条目，默认值是10',
    },
  },
  resolve: async (_: any, args: GOODS.ISearchInput) => {
    let { pageNo, pageSize } = args;
    pageNo = pageNo || 1;
    pageSize = pageSize || 10;
    const items = await Goods.findAll<GOODS.IGoodsType>({
      offset: (pageNo - 1) * pageSize,
      limit: pageSize,
      order: 'createdAt DESC',
      where: {
        isDeleted: 0,
      },
    });
    let totalCount: any = await Goods.findAll<number>({
      attributes: [[db.fn('COUNT', db.col('*')), 'totalCount']],
      where: {
        isDeleted: 0,
      },
    });
    totalCount = totalCount[0].dataValues.totalCount;
    return {
      page: {
        pageNo,
        pageSize,
        totalCount,
        totalPageCount: Math.ceil(totalCount / pageSize),
      },
      items,
    };
  },
};
