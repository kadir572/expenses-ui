'use client'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react'
import { login } from '../../actions'
import { useFormState } from 'react-dom'

export default function LoginForm() {
  const [formState, formAction] = useFormState(login, {
    message: '',
    status: '',
  })
  return (
    <Box
      width='100%'
      maxW='400px'
      mx='auto'
      mt='100px'
      p='6'
      boxShadow='lg'
      borderRadius='md'
    >
      {formState.status === 'error' && (
        <Text color='red.500' mb='4'>
          {formState.message}
        </Text>
      )}
      <form action={formAction}>
        <FormControl id='username' mb='4'>
          <FormLabel>Username</FormLabel>
          <Input type='text' name='username' />
        </FormControl>
        <FormControl id='password' mb='4'>
          <FormLabel>Password</FormLabel>
          <Input type='password' name='password' />
        </FormControl>
        <Button type='submit' colorScheme='teal' width='full'>
          Submit
        </Button>
      </form>
    </Box>
  )
}
