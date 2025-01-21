import { db, DataTypes } from '../db/config';
import Logger from '../libs/logger';

export const Report = db.define(
  'Report',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    daily_revenue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    average_order_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_orders: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active_customers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock_turnover_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: 'reports',
    timestamps: true,
    underscored: true,
  },
);

// Synchronize the model with the database
(async () => {
  try {
    await Report.sync({ force: false });
    Logger.info('Report model synchronized with the database.');
  } catch (error) {
    Logger.error('Error synchronizing the Report model : ', error);
  }
})();
