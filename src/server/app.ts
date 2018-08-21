import * as Koa from 'koa';
import routes from './routes';
// import middlewares from './middlewares';
import * as koaBody from 'koa-body';
import * as serve from 'koa-static';
import * as path from 'path';
import * as fs from 'fs';
import * as config from 'config';
const isProd = process.env.NODE_ENV === 'production';

const app = new Koa();

app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认200M
      // uploadDir: os.tmpDir(),
    },
  }),
);

const serveDir = path.join(config.get('root'), `statics`);
if (!fs.existsSync(serveDir)) {
  fs.mkdirSync(serveDir);
}
if (!isProd) {
  // 开发环境：指定服务器的静态资源地址，上传的文件可以直接localhost:9090/statics/filename访问到
  // 生产环境：用nginx作静态服务器
  app.use(serve(config.get('root')));
}

app.use(require('koa-compress')());
// middlewares(app);

app.use(routes);
app.use(ctx => {
  if (!ctx.path.includes('statics')) {
    ctx.body = 'GraphQL BackEnd';
  }
});

export default app;
