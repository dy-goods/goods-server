const graphqlHTTP = require('koa-graphql');
import schema from './schema';

const isDev = process.env.NODE_ENV === 'development';

export default graphqlHTTP({
  schema,
  graphiql: isDev,
});
