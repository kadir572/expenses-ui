import { auth } from '@/auth'
import Footer from '@/components/partials/Footer'
import Header from '@/components/partials/Header'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import { redirect } from 'next/navigation'
import Container from '@mui/material/Container'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItem from '@mui/material/ListItem'
import SideNav from '@/components/nav/SideNav'

type Props = {
  children: React.ReactNode
}

export default async function ProtectedLayout({ children }: Props) {
  const drawerWidth = 240
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        maxWidth: 1920,
        padding: 0,
      }}
    >
      <Header />
      <Toolbar />
      <Box sx={{ display: 'flex', flexGrow: 1, position: 'relative' }}>
        {/** Desktop Side nav */}
        <SideNav />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            // width: { md: `calc(100% - ${drawerWidth}px)` },
            // ml: { md: `${drawerWidth}px` },
          }}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Container>
  )
}
