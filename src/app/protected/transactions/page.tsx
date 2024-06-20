import { getTransactions, getTransactionsMonthly } from '@/app/actions'
import { auth } from '@/auth'
import { Transaction } from '@/lib/types/transaction.type'
import Box from '@mui/material/Box'
import TableContainer from '@mui/material/TableContainer'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { getMonth } from '@/lib/helpers/date'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import ButtonBase from '@mui/material/ButtonBase'
import Link from 'next/link'
import MonthlyTransactions from '../../../components/transaction/MonthlyTransactions'
import TransactionDetails from '../../../components/transaction/TransactionDetails'
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
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          display='flex'
          width='100%'
          alignItems='center'
          justifyContent='space-between'
          mb={2}
        >
          <Typography component='h1' variant='h4'>
            Transactions
          </Typography>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Tooltip title='Add transaction' arrow>
              <IconButton
                sx={{
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
                LinkComponent={Link}
                href='/protected/transactions/add'
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <AddTransactionDesktopButton />
          </Box>
        </Box>
      </Box>
      {!transactions && (
        <Typography variant='body1'>Loading transactions...</Typography>
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
    </Box>
  )
}
