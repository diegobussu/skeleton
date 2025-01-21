import { db, DataTypes } from '../db/config';
import Logger from '../libs/logger';

export const NutritionalInfo = db.define(
  'NutritionalInfo',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    energy: {
      type: DataTypes.FLOAT,
    },
    fat: {
      type: DataTypes.FLOAT,
    },
    saturated_fat: {
      type: DataTypes.FLOAT,
    },
    carbohydrates: {
      type: DataTypes.FLOAT,
    },
    sugars: {
      type: DataTypes.FLOAT,
    },
    proteins: {
      type: DataTypes.FLOAT,
    },
    salt: {
      type: DataTypes.FLOAT,
    },
    fiber: {
      type: DataTypes.FLOAT,
    },
    portion_size: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'nutritional_infos',
    timestamps: true,
    underscored: true,
  },
);

// Definition of relationships
import { Product } from './Product';
NutritionalInfo.belongsTo(Product, { foreignKey: 'product_id' });

// Synchronize the model with the database
(async () => {
  try {
    await NutritionalInfo.sync({ force: false });
    Logger.info('NutritionalInfo model synchronized with the database.');
  } catch (error) {
    Logger.error('Error synchronizing the NutritionalInfo model : ', error);
  }
})();
