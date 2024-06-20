'use client'

import { logout } from '@/app/actions'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import NextLink from 'next/link'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PaymentsIcon from '@mui/icons-material/Payments'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

export default function SideNav() {
  const drawerWidth = 240
  return (
    <Box
      component={'nav'}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: { xs: 'none', md: 'block' },
        borderRight: 1,
        borderLeft: 1,
        borderColor: 'divider',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 64,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List>
          <ListItem disablePadding>
            <Link
              component={NextLink}
              href='/protected'
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              component={NextLink}
              href='/protected/transactions'
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <PaymentsIcon />
                </ListItemIcon>
                <ListItemText primary={'Transactions'} />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <Link
              component={NextLink}
              href='/protected/settings'
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={'Settings'} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                logout()
              }}
              sx={{
                width: '100%',
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}
