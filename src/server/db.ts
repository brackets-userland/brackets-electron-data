import * as config from 'config';
import * as Sequelize from 'sequelize';

export const sequelize = new Sequelize(config.get('db.url') as string);

export const HealthLogs = sequelize.define('HealthLogs', {
  id: { field: 'id', type: Sequelize.BIGINT, primaryKey: true },
  ip: { field: 'ip', type: Sequelize.STRING(255), allowNull: false },
  userAgent: { field: 'user_agent', type: Sequelize.TEXT, allowNull: false },
  data: { field: 'data', type: Sequelize.JSONB, allowNull: false }
}, {
  tableName: 'health_logs'
});
