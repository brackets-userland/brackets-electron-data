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

export async function handleHealthDaily(ctx: Koa.Context, next: () => Promise<any>) {
  const rows = await db.sequelize.query(`
    SELECT DISTINCT(date_trunc('day', hl."createdAt")) as day FROM public.health_logs hl ORDER BY day DESC
  `, { type: db.sequelize.QueryTypes.SELECT });
  const days = rows.map((r: { day: string }) => r.day);

  const results: { [day: string]: any } = {};

  await Promise.all(days.map(async (day: string) => {
    const entries = await db.sequelize.query(`
      SELECT *
      FROM public.health_logs h1
      WHERE date_trunc('day', "createdAt") = :day
      ORDER BY "createdAt" DESC
    `, {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: { day }
    });
    results[day] = {
      count: entries.length
    };
  }));

  ctx.response.body = JSON.stringify(results, null, 4);
}
