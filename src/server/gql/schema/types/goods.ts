import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from 'graphql';

export const GoodsType = new GraphQLObjectType({
  name: 'Goods',
  fields: (): FieldConfigMap<GOODS.IGoodsType> => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ID',
    },
    videoUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: '视频链接',
    },
    stars: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '点赞数',
    },
    shareCount: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '分享数',
    },
    buyCount: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '购买数量',
    },
    price: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '价格，以分为单位',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: '商品标题',
    },
    imgUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: '商品图片',
    },
    tkl: {
      type: new GraphQLNonNull(GraphQLString),
      description: '淘口令',
    },

    poster: {
      type: GraphQLString,
      description: '转发用的图片，video元素的poster属性',
    },
    recommends: {
      type: GraphQLString,
      description: '推荐语',
    },
    discount: {
      type: GraphQLFloat,
      description: '折扣,eg：6.6',
    },
    taobaoPrice: {
      type: GraphQLInt,
      description: '淘宝价格，以分为单位',
    },
    labels: {
      type: GraphQLString,
      description: '商品标签',
    },
    isDeleted: {
      type: GraphQLBoolean,
      description: '软删除标记',
    },
    createdAt: {
      type: GraphQLInt,
      description: '创建时间',
    },
    updatedAt: {
      type: GraphQLInt,
      description: '修改时间',
    },
  }),
});

export const GoodsSearchInputType = new GraphQLObjectType({
  name: 'SearchGoodsInput',
  fields: (): FieldConfigMap<GOODS.ISearchInput> => ({
    pageNo: {
      type: GraphQLInt,
      description: '第几页',
    },
    pageSize: {
      type: GraphQLInt,
      description: '一页多少条目',
    },
  }),
});

export const PageType = new GraphQLObjectType({
  name: 'Page',
  fields: (): FieldConfigMap<IPage> => ({
    pageNo: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '',
    },
    pageSize: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '',
    },
    totalCount: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '',
    },
    totalPageCount: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '',
    },
  }),
});

export const GoodsSearchOutputType = new GraphQLObjectType({
  name: 'GoodsSearchOutput',
  fields: (): FieldConfigMap<GOODS.ISearchOutput> => ({
    items: {
      type: new GraphQLList(GoodsType),
    },
    page: {
      type: PageType,
    },
  }),
});

export const AddGoodsInputType = new GraphQLInputObjectType({
  name: 'AddGoodsInput',
  fields: (): InputFieldConfigMap<GOODS.IAddInput> => ({
    videoUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: '视频链接',
    },
    stars: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '点赞数',
    },
    shareCount: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '分享数',
    },
    buyCount: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '购买数量',
    },
    price: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '价格，以分为单位',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: '商品标题',
    },
    imgUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: '商品图片',
    },
    tkl: {
      type: new GraphQLNonNull(GraphQLString),
      description: '淘口令',
    },

    poster: {
      type: GraphQLString,
      description: '转发用的图片，video元素的poster属性',
    },
    recommends: {
      type: GraphQLString,
      description: '推荐语',
    },
    discount: {
      type: GraphQLFloat,
      description: '折扣,eg：6.6',
    },
    taobaoPrice: {
      type: GraphQLInt,
      description: '淘宝价格，以分为单位',
    },
    labels: {
      type: GraphQLString,
      description: '商品标签',
    },
  }),
});

export const UpdateGoodsInputType = new GraphQLInputObjectType({
  name: 'UpdateGoodsInput',
  fields: (): InputFieldConfigMap<GOODS.IUpdateInput> => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ID',
    },
    videoUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: '视频链接',
    },
    stars: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '点赞数',
    },
    shareCount: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '分享数',
    },
    buyCount: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '购买数量',
    },
    price: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '价格，以分为单位',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: '商品标题',
    },
    imgUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: '商品图片',
    },
    tkl: {
      type: new GraphQLNonNull(GraphQLString),
      description: '淘口令',
    },

    poster: {
      type: GraphQLString,
      description: '转发用的图片，video元素的poster属性',
    },
    recommends: {
      type: GraphQLString,
      description: '推荐语',
    },
    discount: {
      type: GraphQLFloat,
      description: '折扣,eg：6.6',
    },
    taobaoPrice: {
      type: GraphQLInt,
      description: '淘宝价格，以分为单位',
    },
    labels: {
      type: GraphQLString,
      description: '商品标签',
    },
  }),
});

export const AddGoodsOutputType = new GraphQLObjectType({
  name: 'AddGoodsOutputType',
  fields: (): FieldConfigMap<GOODS.IAdOutput> => ({
    id: {
      type: GraphQLString,
      description: 'id',
    },
  }),
});
