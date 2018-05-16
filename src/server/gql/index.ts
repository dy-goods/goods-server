const graphqlHTTP = require('koa-graphql');
import * as Router from 'koa-router';
import schema from './schema';

const isDev = process.env.NODE_ENV === 'development';

const router = new Router();

router.all(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: isDev,
  }),
);

export default router.routes();
