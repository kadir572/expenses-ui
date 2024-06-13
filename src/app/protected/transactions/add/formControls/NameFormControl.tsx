import { FormControl, FormLabel, Input } from '@chakra-ui/react'

export default function NameFormControl() {
  return (
    <FormControl id='name' isRequired>
      <FormLabel>Transaction Name</FormLabel>
      <Input name='name' placeholder='Enter transaction name' />
    </FormControl>
  )
}
