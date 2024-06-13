'use client'

import { AddIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function AddTransactionButton() {
  return (
    <Link href='/protected/transactions/add'>
      <IconButton
        icon={<AddIcon />}
        colorScheme='teal'
        size='lg'
        // isRound
        position='fixed'
        bottom='24'
        right='4'
        zIndex='docked'
        aria-label='Add new transaction'
      />
    </Link>
  )
}
