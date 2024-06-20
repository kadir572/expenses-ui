import { getTransaction } from '@/app/actions'
import { auth } from '@/auth'
import TransactionOptions from '@/components/transaction/TransactionOptions'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { format } from 'date-fns'
import LaptopIcon from '@mui/icons-material/Laptop'
import StoreIcon from '@mui/icons-material/Store'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import Avatar from '@mui/material/Avatar'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SendToMobileIcon from '@mui/icons-material/SendToMobile'
import ReplayIcon from '@mui/icons-material/Replay'
import Grid from '@mui/material/Grid'

type Props = {
  params: { id: string }
}

export default async function TransactionsPage({ params }: Props) {
  const session = await auth()
  const transaction = await getTransaction(
    params.id,
    session?.accessToken ?? ''
  )

  const amountColor =
    transaction.categoryId === 1 ? 'success.main' : 'error.main'
  const amountPrefix = transaction.categoryId === 1 ? '+' : '-'

  return (
    <Box display='flex' flexDirection='column' minHeight='60%'>
      <TransactionOptions
        userId={session?.userID}
        transactionProp={transaction}
      />

      <Typography variant='h4' component='h1' gutterBottom>
        Transaction Details
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          my: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h6'>{transaction.name}</Typography>
          <Box display='flex' alignItems='center' gap={2}>
            <Typography variant='subtitle2' color='textSecondary'>
              CHF
            </Typography>
            <Typography
              variant='h6'
              color={amountColor}
            >{`${amountPrefix} ${transaction.amount.toFixed(2)}`}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='subtitle1' color='textSecondary'>
            {transaction.source}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
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
              <Tooltip title='Recurring transaction' arrow enterTouchDelay={0}>
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
                {transaction.paymentMethod === 'twint' && <SendToMobileIcon />}
              </Avatar>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      {transaction.description && (
        <Typography color='textSecondary'>{transaction.description}</Typography>
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
          <Typography color='textSecondary'>{transaction.user.role}</Typography>
        </Box>
      </Box>
    </Box>
  )
}
