import { auth } from '@/auth'
import Box from '@mui/material/Box'

type Props = {
  params: { id: string }
}

export default async function EditTransaction({ params }: Props) {
  const session = await auth()
  return <Box>{`Transaction id: ${params.id}`}</Box>
}
