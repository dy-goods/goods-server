import * as Koa from 'koa';
import routes from './routes';
// import middlewares from './middlewares';
import * as bodyParser from 'koa-bodyparser';
import gql from './gql';

import './gql/models/test';

const app = new Koa();

app.use(require('koa-compress')());
app.use(bodyParser());
// middlewares(app);

app.use(routes);
app.use(gql);
app.use(ctx => {
  ctx.body = 'GraphQL Endpoint';
});

export default app;
