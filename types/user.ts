import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  companyName?: string;
  agencyName?: string;
  subscription?: any;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
