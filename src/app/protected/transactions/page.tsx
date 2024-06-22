import { redirect } from 'next/navigation'

export default async function TransactionsPage() {
  redirect('/protected/transactions/all')
}
