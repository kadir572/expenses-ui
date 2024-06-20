'use client'

import { login } from '../../actions'
import { useFormState } from 'react-dom'
import { useState, useEffect, SyntheticEvent, useRef } from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import useTheme from '@mui/material/styles/useTheme'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useActionState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useMutation } from '@tanstack/react-query'

export default function LoginForm() {
  const [formState, formAction] = useFormState(login, {
    message: '',
    status: '',
  })

  // const {
  //   data,
  //   isPending,
  //   mutate: server_login,
  // } = useMutation({
  //   mutationFn: login,
  // })

  const [open, setOpen] = useState<boolean>(false)
  const [username, setUsername] = useState<string>(
    (typeof window !== 'undefined' && localStorage.getItem('username')) || ''
  )
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(
    (typeof window !== 'undefined' &&
      localStorage.getItem('rememberMe') === 'true') ||
      false
  )
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (remember) {
      localStorage.setItem('username', username)
    } else {
      localStorage.removeItem('username')
    }
    localStorage.setItem('rememberMe', remember.toString())
  }, [remember, username])

  useEffect(() => {
    if (remember && username !== '') {
      passwordRef.current?.focus()
    } else {
      usernameRef.current?.focus()
    }
  }, [])

  useEffect(() => {
    if (formState.status === 'error') {
      if (!remember) setUsername('')
      setPassword('')
      setOpen(true)
      username === ''
        ? usernameRef.current?.focus()
        : passwordRef.current?.focus()
    }
  }, [formState])

  const handleClose = (
    event: Event | SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Container
      maxWidth='xs'
      sx={{
        bgcolor: 'background.paper',
        padding: isXs ? 2 : 4,
        marginTop: '200px',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <Stack spacing={4}>
        <Typography variant='h4' component='h1'>
          Expense Tracker
        </Typography>
        <Stack spacing={4}>
          <Typography variant='h5' component='h2'>
            Login
          </Typography>
          <form action={formAction}>
            <Stack spacing={2}>
              <TextField
                id='username'
                name='username'
                label='Username'
                variant='outlined'
                placeholder='Enter username'
                fullWidth
                required
                size='small'
                value={username}
                onChange={e => setUsername(e.target.value)}
                inputRef={usernameRef}
              />
              <TextField
                id='password'
                type='password'
                name='password'
                label='Password'
                variant='outlined'
                placeholder='Enter password'
                fullWidth
                required
                size='small'
                value={password}
                onChange={e => setPassword(e.target.value)}
                inputRef={passwordRef}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                    color='primary'
                  />
                }
                label='Remember me'
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
              >
                Login
              </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          {formState.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}
