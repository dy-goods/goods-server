import Router = require('koa-router');
import { setRouter } from './decorator';
import './entry';
import gql from '../gql';

const router = new Router();

setRouter(router);
router.all('/graphql', gql);

export default router.routes();
