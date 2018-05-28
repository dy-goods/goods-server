import client from './client';
import { observable, IObservableArray, action, runInAction } from 'mobx';
import gql from 'graphql-tag';

export default class GoodsStore {
  @observable goodsList: IObservableArray<GOODS.IGoodsType> = observable([]);
  @observable
  pageInfo: IPage = {
    pageNo: 1,
    pageSize: 10,
    totalCount: 0,
    totalPageCount: 1,
  };

  @action
  async getGoodsList() {
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
            tkl
          }
        }
      }
    `;
    const ret = await client.query<{
      goods: GOODS.ISearchOutput;
    }>({
      query,
      variables: {
        pageNo: this.pageInfo.pageNo,
        pageSize: this.pageInfo.pageSize,
      },
    });
    if (ret.loading) {
      return;
    }
    const { items, page } = ret.data.goods;
    if (items && items.length) {
      runInAction(() => {
        this.goodsList.replace(items);
        this.pageInfo = page;
      });
      return items;
    }
  }

  @action
  async deleteGoods(id: string) {
    const mutation = gql`
      mutation deleteGoods($id: String!) {
        deleteGoods(id: $id)
      }
    `;
    const ret = await client.mutate<{
      deleteGoods: boolean;
    }>({
      mutation,
      variables: {
        id,
      },
    });
    if (ret.data && ret.data.deleteGoods) {
      runInAction(() => {
        const goods = this.goodsList.find(
          item => item.id === id,
        ) as GOODS.IGoodsType;
        this.goodsList.remove(goods);
      });
      return true;
    }
  }

  @action
  async updateGoods(input: GOODS.IUpdateInput) {
    const mutation = gql`
      mutation updateGoods($input: UpdateGoodsInput!) {
        updateGoods(input: $input)
      }
    `;
    const ret = await client.mutate<{
      updateGoods: boolean;
    }>({
      mutation,
      variables: {
        input,
      },
    });
    if (ret.data && ret.data.updateGoods) {
      runInAction(() => {
        const id = this.goodsList.findIndex(item => item.id === input.id);
        this.goodsList[id] = {
          ...this.goodsList[id],
          ...input,
        };
      });
      return true;
    }
  }

  @action
  async addGoos(input: GOODS.IAddInput) {
    const mutation = gql`
      mutation addGoods($input: AddGoodsInput!) {
        addGoods(input: $input) {
          id
        }
      }
    `;
    const ret = await client.mutate<{
      addGoods: GOODS.IAdOutput;
    }>({
      mutation,
      variables: {
        input,
      },
    });
    if (ret.data && ret.data.addGoods) {
      runInAction(() => {
        this.goodsList.push({
          ...input,
          id: (ret.data as any).addGoods.id,
          isDeleted: false,
        });
      });
      return true;
    }
  }

  @action
  selectPage(pageNo: number) {
    this.pageInfo.pageNo = pageNo;
    this.getGoodsList();
  }
}
