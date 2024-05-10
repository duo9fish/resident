import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

export type Module = {
  id: number;
  image: string | null;
  name: string;
  link: any;
};

//2FnEj2tKK5Z5tRdE

// export type Announcement = {
//   announcement_id: number;
//   title: string;
//   image: string | null;
//   date: string;
//   sender: string;
//   content: string;

// };

// export type Billing = {
//   id: number;
//   title: string;
//   price: number;
//   status: string;
//   due_date: string;

// };

// export type Feedback = {
//   feedback_id: number;
//   title: string; 
//   comment: string;
//   image: string | null;
//   date: string;
//   status: string;
//   category: string;
//   solution: string;
// };

// export const BillingStatusList: BillingStatus[] = [
//   'Unpaid',
//   'Paid',
// ] 









// export type Product = {
//   id: number;
//   image: string | null;
//   name: string;
//   price: number;
// };

// export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

// export type CartItem = {
//   id: string;
//   product: Product;
//   product_id: number;
//   size: PizzaSize;
//   quantity: number;
// };

// export const OrderStatusList: OrderStatus[] = [
//   'New',
//   'Cooking',
//   'Delivering',
//   'Delivered',
// ];

// export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

// export type Order = {
//   id: number;
//   created_at: string;
//   total: number;
//   user_id: string;
//   status: OrderStatus;

//   order_items?: OrderItem[];
// };

// export type OrderItem = {
//   id: number;
//   product_id: number;
//   products: Product;
//   order_id: number;
//   size: PizzaSize;
//   quantity: number;
// };

// export type Profile = {
//   id: string;
//   group: string;
// };
