import db from './index';

const Goods = db.models.Goods;

export default async function test() {
  await db.sync();
  // 同步所有已定义的模型到数据库中,即建立对应的表,必须先sync完，才能往表里添加行

  const good = await Goods.create({
    id: `d-${Date.now()}`,
    videoUrl: '视频连接',
    stars: 100, // 点赞数
    discount: 0.9, // 折扣
    buyCount: 200, // 购买数量
    taobaoPrice: 1000,
    price: 800, // 以分为单位
    title: '标题',
    imgUrl: '图片链接',
    labels: '好玩到爆，省事的气球车', // 标签, eg好玩到爆，省事的气球车
  });
  console.log('created: ' + JSON.stringify(good, null, 2));

  const goods = await Goods.findAll();
  console.log(JSON.stringify(goods, null, 2));
}

test()
  .then(() => console.log('success'))
  .catch((error: Error) => console.log(error));
