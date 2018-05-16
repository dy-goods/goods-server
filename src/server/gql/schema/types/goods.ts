import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql';
import { IGoods } from '../../models/goods';

export const GoodsType = new GraphQLObjectType({
  name: 'Goods',
  fields: (): FieldConfigMap<IGoods> => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ID',
    },
    videoUrl: {
      type: GraphQLString,
      description: '视频链接',
    },
    stars: {
      type: GraphQLInt,
      description: '点赞数',
    },
    discount: {
      type: GraphQLInt,
      description: '折扣',
    },
    buyCount: {
      type: GraphQLInt,
      description: '购买数量',
    },
    taobaoPrice: {
      type: GraphQLInt,
      description: '淘宝价格，以分为单位',
    },
    price: {
      type: GraphQLInt,
      description: '价格，以分为单位',
    },
    title: {
      type: GraphQLString,
      description: '商品标题',
    },
    imgUrl: {
      type: GraphQLString,
      description: '商品图片',
    },
    labels: {
      type: GraphQLString,
      description: '商品标签',
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

export interface IPage {
  pageNo: number; //	目前第几页
  pageSize: number; //	一页多少条目
  totalCount: number; //	总共多少条目
  totalPageCount: number; //	总共多少页
}

export interface IGoodsSearchOutput {
  goods: IGoods[];
  page: IPage;
}

export interface IGoodsSearchInput {
  pageNo: number; //	目前第几页
  pageSize: number; //	一页多少条目
}

export const GoodsSearchInputType = new GraphQLObjectType({
  name: 'GoodsSearchInput',
  fields: (): FieldConfigMap<IGoodsSearchInput> => ({
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
      type: GraphQLInt,
      description: '',
    },
    pageSize: {
      type: GraphQLInt,
      description: '',
    },
    totalCount: {
      type: GraphQLInt,
      description: '',
    },
    totalPageCount: {
      type: GraphQLInt,
      description: '',
    },
  }),
});

export const GoodsSearchOutputType = new GraphQLObjectType({
  name: 'GoodsSearchOutput',
  fields: (): FieldConfigMap<IGoodsSearchOutput> => ({
    goods: {
      type: new GraphQLList(GoodsType),
    },
    page: {
      type: PageType,
    },
  }),
});

export interface GoodsSearchInput {
  pageNo: number; //	目前第几页
  pageSize: number; //	一页多少条目
}

export interface IAddGoogdsArgs {
  input: IAddGoodsInput;
}
export interface IAddGoodsInput {
  videoUrl: string;
  stars: number; // 点赞数
  discount: number; // 折扣
  buyCount: number; // 购买数量
  taobaoPrice: number;
  price: number; // 以分为单位
  title: string;
  imgUrl: string;
  labels: string; // 标签, eg好玩到爆，省事的气球车
}
export interface IAddGoodsOutput {
  id: string;
}
export interface IUpdateGoodsInputArgs {
  input: IUpdateGoodsInput;
}
export interface IUpdateGoodsInput {
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
}

export const AddGoodsInputType = new GraphQLInputObjectType({
  name: 'AddGoodsInput',
  fields: (): InputFieldConfigMap<IAddGoodsInput> => ({
    videoUrl: {
      type: GraphQLString,
      description: '视频链接',
    },
    stars: {
      type: GraphQLInt,
      description: '点赞数',
    },
    discount: {
      type: GraphQLInt,
      description: '折扣',
    },
    buyCount: {
      type: GraphQLInt,
      description: '购买数量',
    },
    taobaoPrice: {
      type: GraphQLInt,
      description: '淘宝价格，以分为单位',
    },
    price: {
      type: GraphQLInt,
      description: '价格，以分为单位',
    },
    title: {
      type: GraphQLString,
      description: '商品标题',
    },
    imgUrl: {
      type: GraphQLString,
      description: '商品图片',
    },
    labels: {
      type: GraphQLString,
      description: '商品标签',
    },
  }),
});

export const UpdateGoodsInputType = new GraphQLInputObjectType({
  name: 'UpdateGoodsInput',
  fields: (): InputFieldConfigMap<IUpdateGoodsInput> => ({
    id: {
      type: GraphQLString,
      description: 'id',
    },
    videoUrl: {
      type: GraphQLString,
      description: '视频链接',
    },
    stars: {
      type: GraphQLInt,
      description: '点赞数',
    },
    discount: {
      type: GraphQLInt,
      description: '折扣',
    },
    buyCount: {
      type: GraphQLInt,
      description: '购买数量',
    },
    taobaoPrice: {
      type: GraphQLInt,
      description: '淘宝价格，以分为单位',
    },
    price: {
      type: GraphQLInt,
      description: '价格，以分为单位',
    },
    title: {
      type: GraphQLString,
      description: '商品标题',
    },
    imgUrl: {
      type: GraphQLString,
      description: '商品图片',
    },
    labels: {
      type: GraphQLString,
      description: '商品标签',
    },
  }),
});

export const AddGoodsOutputType = new GraphQLObjectType({
  name: 'AddGoodsOutputType',
  fields: (): FieldConfigMap<IAddGoodsOutput> => ({
    id: {
      type: GraphQLString,
      description: 'id',
    },
  }),
});
