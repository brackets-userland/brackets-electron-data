import * as config from 'config';
import * as log from './log';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import { handleHealthGet, handleHealthPost } from './server/health';

const app = new Koa();
const router = new Router();

app.proxy = true;

router.get('/api/health', handleHealthGet);
router.post('/api/health', handleHealthPost);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.body = err.stack;
    ctx.response.status = 500;
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(serve(__dirname + '/public'));

const port = config.get('server.port');
app.listen(port);
log.info(`Server started at port ${port}`);
