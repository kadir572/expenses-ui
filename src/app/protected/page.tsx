import { getSession } from 'next-auth/react'
import Logout from './Logout'
import { auth } from '@/auth'
import { IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { redirect } from 'next/navigation'
import AddTransactionButton from './AddTransactionButton'

export default async function ProtectedPage() {
  return (
    <div>
      <h1>Dashbaord</h1>
      <AddTransactionButton />
    </div>
  )
}
