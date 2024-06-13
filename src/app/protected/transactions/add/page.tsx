import { Text } from '@chakra-ui/react'
import Form from './Form'
import { auth } from '@/auth'
import { Category } from '@/lib/types/Category'

export default async function AddTransactionPage() {
  const session = await auth()
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  )
  const data = (await categoriesRes.json()) as Category[]
  return (
    <>
      {data && <Form categories={data} />}
      {!data && <Text>500 - Server Error</Text>}
    </>
  )
}