import { db, DataTypes, Model } from '@db/config';
import Logger from '@libs/logger';

export interface UserPayload {
  userId: number;
  role: string;
}

export interface UserAttributes extends Model {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  address: string;
  zip_code: number;
  city: string;
  country: string;
  role: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export type UserModel = typeof Model & {
  new (): UserAttributes;
};

export const User = <UserModel>db.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
    },
    zip_code: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
      validate: {
        isIn: [['user', 'admin', 'super-admin']],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  },
);

// Synchronize the model with the database
(async () => {
  try {
    await User.sync({ force: false });
    Logger.info('User model synchronized with the database.');
  } catch (error) {
    Logger.error('Error synchronizing the User model : ', error);
  }
})();
