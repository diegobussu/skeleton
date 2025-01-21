import { db, DataTypes } from '../db/config';
import Logger from '../libs/logger';

export const Product = db.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bar_code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'products',
    timestamps: true,
    underscored: true,
  },
);

export const ProductPicture = db.define(
  'ProductPicture',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alt_text: {
      type: DataTypes.STRING,
    },
    is_main: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'product_pictures',
    timestamps: true,
    underscored: true,
  },
);

// Definition of relationships
ProductPicture.belongsTo(Product, { foreignKey: 'product_id' });

// Synchronize all models with the database
(async () => {
  try {
    await ProductPicture.sync({ force: false });
    await Product.sync({ force: false });
    Logger.info('Product & ProductPicture models synchronized with the database.');
  } catch (error) {
    Logger.error('Error synchronizing models : ', error);
  }
})();
