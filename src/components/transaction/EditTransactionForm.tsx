'use client'

import { useTransactionStore } from '@/lib/zustand/store'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TransactionOptions from './TransactionOptions'
import Typography from '@mui/material/Typography'

export default function EditTransactionForm() {
  const transaction = useTransactionStore(state => state.transactionToEdit)
  if (!transaction) return null
  return (
    <Box sx={{ width: '100%', flexGrow: 1, position: 'relative' }}>
      <Paper elevation={3} sx={{ position: 'sticky', top: 80, padding: 2 }}>
        <TransactionOptions />
        <Typography variant='h6' gutterBottom>
          Edit Transaction
        </Typography>
        <Box>{transaction.id}</Box>
      </Paper>
    </Box>
  )
}
