import { auth } from '@/auth'
import { Category } from '@/lib/types/Category'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default async function AddTransactionPage() {
  const session = await auth()

  const getCategories = async () => {
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
    return data
  }

  const data = await getCategories()

  console.log(data)

  if (!data) return <Typography>500 - Server Error</Typography>
  return <>{data && <Box>Data avaiable</Box>}</>
}
