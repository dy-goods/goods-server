import Error from './error';
import Goods from './goods';
const errorStore = new Error();
const goodsStore = new Goods();

const stores = {
  errorStore,
  goodsStore,
};

export default stores;
