import * as config from 'config';
import * as log from './log';
import * as Koa from 'koa';
import * as serve from 'koa-static';

const app = new Koa();

app.use(serve(__dirname + '/public'));

const port = config.get('server.port');
app.listen(port);
log.info(`Server started at port ${port}`);
