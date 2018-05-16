import { GraphQLObjectType } from 'graphql';
import { addGoods, updateGoods, deleteGoods } from './goods';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addGoods,
    updateGoods,
    deleteGoods,
  }),
});
