import * as config from 'config';
import * as Sequelize from 'sequelize';

export const sequelize = new Sequelize(config.get('db.url') as string);

export const HealthLogs = sequelize.define('HealthLogs', {
  id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
  ip: { type: Sequelize.STRING(255), allowNull: false },
  userAgent: { type: Sequelize.TEXT, allowNull: false },
  data: { type: Sequelize.JSONB, allowNull: false }
}, {
  tableName: 'health_logs'
});
