import { FormControl, FormLabel, Input } from '@chakra-ui/react'

export default function AmountFormControl() {
  return (
    <FormControl id='amount' isRequired>
      <FormLabel>Amount</FormLabel>
      <Input
        name='amount'
        type='number'
        placeholder='Enter amount'
        min='0'
        step='0.01'
      />
    </FormControl>
  )
}
