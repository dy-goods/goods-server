declare interface IPage {
  pageNo: number; //	目前第几页
  pageSize: number; //	一页多少条目
  totalCount: number; //	总共多少条目
  totalPageCount: number; //	总共多少页
}

declare module 'unfetch';

declare const config: {
  isProd: boolean;
  graphqlUri: string;
};
