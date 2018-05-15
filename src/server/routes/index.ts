import Router = require('koa-router');
import { setRouter } from './decorator';
import './entry';

const router = new Router();

setRouter(router);
export default router.routes();
