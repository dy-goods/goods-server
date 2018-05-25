declare namespace GOODS {
  type IGoodsType = IUpdateInput & {
    isDeleted?: boolean;
    createdAt?: number;
    updatedAt?: number;
  };

  interface ISearchOutput {
    items: GOODS.IGoodsType[];
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
  type IUpdateInput = IAddInput & {
    id: string;
  };
}
