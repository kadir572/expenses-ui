import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import AddTransactionDesktopButton from '@/components/transaction/AddTransactionDesktopButton'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

type Props = {
  children: React.ReactNode
}

export default function TransactionsLayout({ children }: Props) {
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
          <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
            <Tooltip title='Add transaction' arrow>
              <IconButton
                size='small'
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
          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <AddTransactionDesktopButton />
          </Box>
        </Box>
      </Box>
      {children}
    </Box>
  )
}
