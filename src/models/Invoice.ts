import { db, DataTypes } from '../db/config';
import Logger from '../libs/logger';
import { Product } from './Product';
import { User } from './User';

export const Invoice = db.define(
  'Invoice',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    paypal_transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    issue_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'invoices',
    timestamps: true,
    underscored: true,
  },
);

// Definition of relationships
Invoice.belongsTo(User, { foreignKey: 'user_id' });

export const InvoiceItem = db.define(
  'InvoiceItem',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: 'invoice_items',
    timestamps: true,
    underscored: true,
  },
);

// Definition of relationships
InvoiceItem.belongsTo(Product, { foreignKey: 'product_id' });
InvoiceItem.belongsTo(Invoice, { foreignKey: 'invoice_id' });

// Synchronize all models with the database
(async () => {
  try {
    await Invoice.sync({ force: false });
    await InvoiceItem.sync({ force: false });
    Logger.info('Invoice & InvoiceItem models synchronized with the database.');
  } catch (error) {
    Logger.error('Error synchronizing models : ', error);
  }
})();
