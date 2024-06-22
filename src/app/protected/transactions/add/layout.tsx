import TransactionOptions from '@/components/transaction/TransactionOptions'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function AddTransactionLayout({ children }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h4' component='h1'>
          Add Transaction
        </Typography>
        <TransactionOptions />
      </Box>
      {children}
    </Box>
  )
}
