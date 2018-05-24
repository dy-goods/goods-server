import * as Koa from 'koa';
import routes from './routes';
// import middlewares from './middlewares';
import * as bodyParser from 'koa-bodyparser';

const app = new Koa();

app.use(require('koa-compress')());
app.use(bodyParser());
// middlewares(app);

app.use(routes);
app.use(ctx => {
  if (!ctx.path.includes('statics')) {
    ctx.body = 'GraphQL BackEnd';
  }
});

export default app;
