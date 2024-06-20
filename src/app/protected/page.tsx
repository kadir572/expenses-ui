import { getSession } from 'next-auth/react'
import Logout from './Logout'
import { auth } from '@/auth'
import { IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { redirect } from 'next/navigation'
import AddTransactionButton from './AddTransactionButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default async function ProtectedPage() {
  return (
    <Box>
      <Typography variant='h5' component='h1'>
        Dashboard
      </Typography>
    </Box>
  )
}
