import { GraphQLObjectType } from 'graphql';

import { goods } from './goods';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    goods,
  }),
});
