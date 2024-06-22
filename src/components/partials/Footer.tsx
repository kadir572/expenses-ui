import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
        bgColor: 'red',
        color: 'white',
      }}
    >
      <Box textAlign='center'>
        <Typography fontSize='sm'>
          &copy; {new Date().getFullYear()} Expense Tracker. All rights
          reserved.
        </Typography>
        <Typography fontSize='sm' mt={2}>
          Made with ❤️ by Kadir Karadavut
        </Typography>
      </Box>
    </Box>
  )
}
