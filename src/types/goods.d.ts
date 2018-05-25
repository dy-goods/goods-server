declare namespace GOODS {
  interface IGoodsType {
    id: string;
    videoUrl: string; // 视频链接
    stars: number; // 点赞数
    discount: number; // 折扣
    buyCount: number; // 购买数量
    taobaoPrice: number; // 淘宝价格
    price: number; // 价格，以分为单位
    title: string; // 标题
    imgUrl: string; // 图片链接
    labels: string; // 标签, eg好玩到爆，省事的气球车
    isDeleted: boolean;
    createdAt: number;
    updatedAt: number;
  }

  interface ISearchOutput {
    goods: GOODS.IGoodsType[];
    page: IPage;
  }

  interface ISearchInput {
    pageNo: number; //	目前第几页
    pageSize: number; //	一页多少条目
  }

  interface IAddArgs {
    input: IAddInput;
  }
  interface IAddInput {
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
  interface IAdOutput {
    id: string;
  }
  interface IUpdateInputArgs {
    input: IUpdateInput;
  }
  interface IUpdateInput {
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
}
