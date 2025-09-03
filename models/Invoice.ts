import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

// Define interface for Invoice items
interface IInvoiceItem {
  name: string;
  description?: string;
  quantity: number;
  price: number;
}

// Define interface for Invoice document
export interface IInvoice extends Document {
  user: IUser['_id'];
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: 'paid' | 'unpaid' | 'cancelled';
  items: IInvoiceItem[];
  paymentMethod?: 'paypal' | 'credit_card' | 'bank_transfer';
  paymentId?: string;
  issueDate: Date;
  dueDate?: Date;
  paidDate?: Date;
}

const InvoiceSchema = new Schema<IInvoice>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  status: {
    type: String,
    enum: ['paid', 'unpaid', 'cancelled'],
    default: 'unpaid',
  },
  items: [{
    name: { type: String, required: true },
    description: String,
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  paymentMethod: {
    type: String,
    enum: ['paypal', 'credit_card', 'bank_transfer'],
  },
  paymentId: String,
  issueDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: Date,
  paidDate: Date,
});

export const Invoice = mongoose.models.Invoice || mongoose.model<IInvoice>('Invoice', InvoiceSchema);