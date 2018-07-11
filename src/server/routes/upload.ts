import { route } from './decorator';
import { Context } from 'koa';
import * as path from 'path';
import * as fs from 'fs';
import * as config from 'config';

export class UploadController {
  @route('post', '/upload')
  async upload(ctx: Context) {
    const files = (ctx.request as any).files; // 获取上传文件
    let fileNames: string[] = [];
    for (const key of Object.keys(files)) {
      const file = files[key];
      const readStream = fs.createReadStream(file.path); // file.path为一个缓存的本地目录，创建可读流
      fileNames.push(file.name);
      const writeStream = fs.createWriteStream(
        path.resolve(config.get('root'), `./statics/${file.name}`),
      ); // 创建可写流
      readStream.pipe(writeStream); // 可读流通过管道写入可写流
    }

    return {
      urls: fileNames.map(fileName => `${ctx.host}/statics/${fileName}`),
    };
  }
}
