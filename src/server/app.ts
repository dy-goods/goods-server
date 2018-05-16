import * as Koa from 'koa';
import routes from './routes';
// import middlewares from './middlewares';
import * as bodyParser from 'koa-bodyparser';

import './graphql/models/test';

const app = new Koa();

app.use(require('koa-compress')());
app.use(bodyParser());
// middlewares(app);

app.use(routes);

export default app;
