import { Category, Subcategory } from './Category'
import { User } from './user.type'

export enum PaymentMethod {
  card = 'card',
  cash = 'cash',
  twint = 'twint',
}

export enum PurchaseLocation {
  store = 'store',
  online = 'online',
  other = 'other',
}

export enum Interval {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
  yearly = 'yearly',
}

export type Transaction = {
  id: number
  name: string
  description?: string
  amount: number
  source: string
  categoryId: number
  subcategoryId: number
  paymentMethod: PaymentMethod
  purchaseLocation: PurchaseLocation
  date: Date
  recurring: boolean
  interval?: Interval
  nextRunDate?: Date
  userId: number
  createdAt: Date
  updatedAt: Date
  user: User
  category: Category
  subcategory: Subcategory
}
