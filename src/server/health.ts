import * as _ from 'lodash';
import * as db from './db';
import * as Koa from 'koa';

export async function handleHealthGet(ctx: Koa.Context, next: () => Promise<any>) {
  const healthLogs = await db.HealthLogs.findAll();
  ctx.response.body = JSON.stringify(healthLogs, null, 4);
}

export async function handleHealthPost(ctx: Koa.Context, next: () => Promise<any>) {
  const ip = ctx.request.ip;
  const userAgent = ctx.request.headers['user-agent'];
  let data = ctx.request.body;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (err) {
      /* ignore */
    }
  }
  if (_.isEmpty(data)) {
    ctx.response.status = 400;
    return;
  }
  const healthLog = await db.HealthLogs.create({ ip, userAgent, data });
  ctx.response.body = JSON.stringify(healthLog, null, 4);
}
