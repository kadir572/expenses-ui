import { getTransactionsMonthly } from '@/app/actions'
import { auth } from '@/auth'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import MonthlyTransactions from '../../../../components/transaction/MonthlyTransactions'
import TransactionDetails from '../../../../components/transaction/TransactionDetails'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import AddTransactionForm from '@/components/transaction/AddTransactionForm'
import EditTransactionForm from '@/components/transaction/EditTransactionForm'
import AddTransactionDesktopButton from '@/components/transaction/AddTransactionDesktopButton'

export default async function TransactionsPage() {
  const session = await auth()
  const transactions = await getTransactionsMonthly(session?.accessToken ?? '')
  return (
    <>
      {!transactions && (
        <Typography>
          500 - Internal Server Error. Try reloading the page.
        </Typography>
      )}
      {transactions.length <= 0 && (
        <Typography variant='body1'>
          Create your first transaction by clicking on the &quot;+&quot; icon
        </Typography>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Paper elevation={3}>
            <Box>
              {transactions &&
                transactions.map((transactionsMonth, index) => (
                  <MonthlyTransactions
                    monthlyTransactions={transactionsMonth}
                    key={index}
                  />
                ))}
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{ display: { xs: 'none', lg: 'flex', bgcolor: 'blue' } }}
        >
          <TransactionDetails userId={session?.userID ?? 0} />
          <AddTransactionForm />
          <EditTransactionForm />
        </Grid>
      </Grid>
    </>
  )
}
