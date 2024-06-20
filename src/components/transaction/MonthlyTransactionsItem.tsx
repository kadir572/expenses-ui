'use client'

import { Transaction } from '@/lib/types/transaction.type'
import Avatar from '@mui/material/Avatar'
import ButtonBase from '@mui/material/ButtonBase'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { format } from 'date-fns'
import { useTransactionStore } from '@/lib/zustand/store'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

type Props = {
  transaction: Transaction
}

export default function MonthlyTransactionsItem({ transaction }: Props) {
  const selectTransaction = useTransactionStore(
    state => state.selectTransaction
  )

  const selectedTransaction = useTransactionStore(
    state => state.selectedTransaction
  )
  const clearTransaction = useTransactionStore(state => state.clearTransaction)
  const isSelected = transaction.id === selectedTransaction?.id
  const selectedColor = '#e0f7fa'

  const handleClick = () => {
    if (isSelected) return clearTransaction()
    selectTransaction(transaction)
  }
  const content = (
    <>
      <Grid container spacing={2} alignItems='center' sx={{ flexGrow: 1 }}>
        <Grid item>
          <Tooltip
            title={`${transaction.category.name} - ${transaction.subcategory.name}`}
          >
            <Avatar>{transaction.subcategory.name.charAt(0)}</Avatar>
          </Tooltip>
        </Grid>
        <Grid item>
          <Typography variant='subtitle1' align='left'>
            {transaction.name}
          </Typography>
          <Typography variant='body2' color='textSecondary' align='left'>
            {format(new Date(transaction.date), 'dd.MM.yyyy')}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant='subtitle1'
          color={transaction.categoryId === 1 ? 'success.main' : 'error.main'}
        >
          {transaction.categoryId === 1 ? '+' : '-'}
        </Typography>
        <Typography
          variant='subtitle1'
          sx={{ ml: 1 }}
          color={transaction.categoryId === 1 ? 'success.main' : 'error.main'}
        >
          {transaction.amount.toFixed(2)}
        </Typography>
      </Box>
      {/* <Typography variant='subtitle1' align='right'>
        CHF {transaction.amount.toFixed(2)}
      </Typography> */}
    </>
  )

  return (
    <>
      <ButtonBase
        LinkComponent={Link}
        href={`/protected/transactions/${transaction.id}`}
        sx={{
          width: '100%',
          display: { xs: 'flex', lg: 'none' },
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        {content}
      </ButtonBase>
      <ButtonBase
        onClick={() => handleClick()}
        sx={{
          width: '100%',
          display: { xs: 'none', lg: 'flex' },
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          bgcolor: isSelected ? '#e5e5e5' : 'inherit',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        {content}
      </ButtonBase>
    </>
  )
}
