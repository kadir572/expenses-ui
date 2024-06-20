import { getMonth } from '@/lib/helpers/date'
import { Transaction } from '@/lib/types/transaction.type'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MonthlyTransactionsItem from './MonthlyTransactionsItem'

type Props = {
  monthlyTransactions: {
    key: string
    month: number
    year: number
    transactions: Transaction[]
  }
}

export default function MonthlyTransactions({ monthlyTransactions }: Props) {
  return (
    <Box key={monthlyTransactions.key}>
      <Stack>
        <Typography variant='h6' px={2} py={2}>
          {`${getMonth(monthlyTransactions.month)} ${monthlyTransactions.year}`}
        </Typography>
        <Paper elevation={0}>
          <Grid container sx={{ mb: 2 }}>
            {monthlyTransactions.transactions.map((transaction, index) => (
              <MonthlyTransactionsItem transaction={transaction} key={index} />
            ))}
          </Grid>
        </Paper>
      </Stack>
    </Box>
  )
}
