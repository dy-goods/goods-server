import { route } from './decorator';
import { Context } from 'koa';
import * as path from 'path';
import * as fs from 'fs';
import * as config from 'config';
import * as gm from 'gm';
import { Files } from 'formidable';
const imageMagick = gm.subClass({ imageMagick: true });

export class UploadController {
  @route('post', '/upload')
  async upload(ctx: Context) {
    const files = ctx.request.files as Files; // 获取上传文件
    let fileNames: string[] = [];
    for (const key of Object.keys(files)) {
      const file = files[key];
      fileNames.push(file.name);
      const filePath = path.resolve(
        config.get('root'),
        `./statics/${file.name}`,
      );
      if (/^image\/*/.test(file.type)) {
        imageMagick(file.path)
          // file.path是koa的一个临时路径
          .resize(1500, 150, '!') //加('!')强行把图片缩放成对应尺寸150*150！
          .autoOrient()
          .write(filePath, err => {
            if (err) {
              console.error(err);
            } else {
              fs.unlink(file.path, err => {
                if (err) {
                  console.error(err);
                }
              });
            }
          });
      } else {
        const readStream = fs.createReadStream(file.path); // file.path为一个缓存的本地目录，创建可读流
        const writeStream = fs.createWriteStream(filePath); // 创建可写流
        readStream.pipe(writeStream).on('finish', () => {
          fs.unlink(file.path, err => {
            if (err) {
              console.error(err);
            }
          });
        }); // 可读流通过管道写入可写流
      }
    }

    return {
      urls: fileNames.map(fileName => `${ctx.host}/statics/${fileName}`),
    };
  }

  @route('get', '/append')
  appendImage(ctx: Context) {
    imageMagick(path.resolve(config.get('root'), `./statics/bg2018061423.jpg`))
      .append(path.resolve(config.get('root'), './statics/161371_large.png'))
      .append(path.resolve(config.get('root'), './statics/161371_large.png'))
      .write(
        path.resolve(config.get('root'), `./statics/new.png`),
        (err: Error) => {
          if (!err) {
            console.log('Written composite image.');
          } else {
            console.error(err);
          }
        },
      );
    return `<img src="${ctx.protocol}://${ctx.host}/statics/new.png" />`;
  }
}
