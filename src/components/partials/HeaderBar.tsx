'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import { useDrawerStore } from '@/lib/zustand/store'

export default function HeaderBar() {
  const { handleDrawerToggle } = useDrawerStore()
  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: theme => theme.zIndex.drawer + 1,
        maxWidth: 1920,
        left: 0,
        right: 0,
        mx: 'auto',
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap component='div'>
          Expense Tracker
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
