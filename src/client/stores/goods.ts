import client from './client';
import { observable, IObservableArray, action, runInAction } from 'mobx';
import gql from 'graphql-tag';

export default class GoodsStore {
  @observable goodsList: IObservableArray<GOODS.IGoodsType> = observable([]);

  @action
  async getGoodsList(pageNo: number, pageSize?: number) {
    const query = gql`
      query goods($pageNo: Int, $pageSize: Int) {
        goods(pageNo: $pageNo, pageSize: $pageSize) {
          page {
            pageNo
            pageSize
            totalCount
            totalPageCount
          }
          items {
            id
            videoUrl
            stars
            discount
            buyCount
            taobaoPrice
            price
            title
            imgUrl
            labels
          }
        }
      }
    `;
    const ret = await client.query<{
      goods: GOODS.ISearchOutput;
    }>({
      query,
      variables: {
        pageNo,
        pageSize,
      },
    });
    if (ret.loading) {
      return;
    }
    const goods = ret.data.goods.items;
    if (goods && goods.length) {
      runInAction(() => this.goodsList.replace(goods));
      return goods;
    }
  }
}
