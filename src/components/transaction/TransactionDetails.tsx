'use client'

import { useTransactionStore } from '@/lib/zustand/store'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { format } from 'date-fns'
import TransactionOptions from './TransactionOptions'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import LaptopIcon from '@mui/icons-material/Laptop'
import StoreIcon from '@mui/icons-material/Store'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import Avatar from '@mui/material/Avatar'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SendToMobileIcon from '@mui/icons-material/SendToMobile'
import ReplayIcon from '@mui/icons-material/Replay'

type Props = {
  userId: number
}

export default function TransactionDetails({ userId }: Props) {
  const transaction = useTransactionStore(state => state.selectedTransaction)
  const clearTransaction = useTransactionStore(state => state.clearTransaction)

  if (!transaction) return null

  const amountColor =
    transaction.categoryId === 1 ? 'success.main' : 'error.main'
  const amountPrefix = transaction.categoryId === 1 ? '+' : '-'

  return (
    <Box sx={{ width: '100%', flexGrow: 1, position: 'relative' }}>
      <Paper elevation={3} sx={{ position: 'sticky', top: 80, padding: 2 }}>
        <TransactionOptions userId={userId} />
        <Typography variant='h6' gutterBottom>
          Transaction Details
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            my: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='subtitle1'>{transaction.name}</Typography>
            <Box display='flex' alignItems='center' gap={2}>
              <Typography variant='caption' color='textSecondary'>
                CHF
              </Typography>
              <Typography
                variant='subtitle1'
                color={amountColor}
              >{`${amountPrefix} ${transaction.amount.toFixed(2)}`}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='subtitle2' color='textSecondary'>
              {transaction.source}
            </Typography>
            <Typography variant='subtitle2' color='textSecondary'>
              {format(new Date(transaction.date), 'dd.MM.yyyy')}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography color='textSecondary'>{`${transaction.category.name} - ${transaction.subcategory.name}`}</Typography>
            <Box display='flex' alignItems='center' gap={1}>
              {transaction.recurring && (
                <Tooltip
                  title='Recurring transaction'
                  arrow
                  enterTouchDelay={0}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'transactionTag.main',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        bgcolor: 'transactionTag.dark',
                      },
                    }}
                  >
                    <ReplayIcon />
                  </Avatar>
                </Tooltip>
              )}
              <Tooltip
                title={`Purchase location: ${
                  transaction.purchaseLocation.charAt(0).toUpperCase() +
                  transaction.purchaseLocation.slice(1)
                }`}
                arrow
                enterTouchDelay={0}
              >
                <Avatar
                  sx={{
                    bgcolor: 'transactionTag.main',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      bgcolor: 'transactionTag.dark',
                    },
                  }}
                >
                  {transaction.purchaseLocation === 'store' && <StoreIcon />}
                  {transaction.purchaseLocation === 'online' && <LaptopIcon />}
                  {transaction.purchaseLocation === 'other' && (
                    <QuestionMarkIcon />
                  )}
                </Avatar>
              </Tooltip>
              <Tooltip
                title={`Payment method: ${
                  transaction.paymentMethod.charAt(0).toUpperCase() +
                  transaction.paymentMethod.slice(1)
                }`}
                arrow
                enterTouchDelay={0}
              >
                <Avatar
                  sx={{
                    bgcolor: 'transactionTag.main',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      bgcolor: 'transactionTag.dark',
                    },
                  }}
                >
                  {transaction.paymentMethod === 'card' && <CreditCardIcon />}
                  {transaction.paymentMethod === 'cash' && <AttachMoneyIcon />}
                  {transaction.paymentMethod === 'twint' && (
                    <SendToMobileIcon />
                  )}
                </Avatar>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        {transaction.description && (
          <Typography color='textSecondary'>
            {transaction.description}
          </Typography>
        )}
        {transaction.recurring &&
          transaction.interval &&
          transaction.nextRunDate && (
            <Box mt={4}>
              <Typography variant='subtitle1' gutterBottom>
                Recurring Transaction
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  columnGap: 16,
                  rowGap: 0.5,
                }}
              >
                <Typography color='textSecondary'>Frequency:</Typography>
                <Typography color='textSecondary'>
                  {transaction.interval.charAt(0).toUpperCase() +
                    transaction.interval.slice(1)}
                </Typography>
                <Typography color='textSecondary'>
                  Next Execution Date:
                </Typography>
                <Typography color='textSecondary'>
                  {format(new Date(transaction.nextRunDate), 'dd.MM.yyyy')}
                </Typography>
              </Box>
            </Box>
          )}
        <Box mt={4}>
          <Typography variant='subtitle1' gutterBottom>
            Created By
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              columnGap: 16,
              rowGap: 0.5,
            }}
          >
            <Typography color='textSecondary'>Username:</Typography>
            <Typography color='textSecondary'>
              {transaction.user.username}
            </Typography>
            <Typography color='textSecondary'>Role:</Typography>
            <Typography color='textSecondary'>
              {transaction.user.role}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
