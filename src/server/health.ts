import * as Koa from 'koa';
import * as db from './db';

export async function handleHealthGet(ctx: Koa.Context, next: () => Promise<any>) {
  const healthLogs = await db.HealthLogs.findAll();
  ctx.response.body = healthLogs;
}

export async function handleHealthPost(ctx: Koa.Context, next: () => Promise<any>) {
  ctx.response.body = 'hello!';
}
