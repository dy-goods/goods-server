import { GraphQLSchema } from 'graphql';

import { QueryType } from './query';
import { MutationType } from './mutation';

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
