'use client'

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

export default function AmountFormControl() {
  const spacing = useBreakpointValue({ base: '4', md: '6' })
  return (
    <FormControl id='amount' isRequired>
      <FormLabel>Amount</FormLabel>
      <Flex gap={spacing} alignItems='center'>
        <Input
          name='amount'
          type='number'
          placeholder='Enter amount'
          min='0'
          step='0.01'
        />
        <Text>CHF</Text>
      </Flex>
    </FormControl>
  )
}
