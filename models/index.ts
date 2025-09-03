export { User } from './User';
export { Invoice } from './Invoice';
export { Admin } from './Admin';
export { Activity } from './Activity';

// Export interfaces
export type { IUser } from './User';
export type { IInvoice } from './Invoice';

// Example usage in an API route
import { Invoice, User } from '@/models';
import type { IInvoice } from '@/models';

async function createUser(userData: Partial<IUser>) {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function createInvoice(userId: string, invoiceData: Partial<IInvoice>) {
  try {
    // Generate unique invoice number (you might want to implement your own logic)
    const invoiceNumber = `INV-${Date.now()}`;

    const invoice = await Invoice.create({
      ...invoiceData,
      user: userId,
      invoiceNumber,
    });

    // Populate user data if needed
    const populatedInvoice = await invoice.populate('user');
    return populatedInvoice;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
}