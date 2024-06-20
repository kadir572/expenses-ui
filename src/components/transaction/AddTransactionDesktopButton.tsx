'use client'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import { useTransactionStore } from '@/lib/zustand/store'

export default function AddTransactionDesktopButton() {
  const openAddTransactionForm = useTransactionStore(
    state => state.openAddTransactionForm
  )
  return (
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
        onClick={() => openAddTransactionForm(true)}
      >
        <AddIcon />
      </IconButton>
    </Tooltip>
  )
}
