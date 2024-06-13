import { FormControl, FormLabel, Input } from '@chakra-ui/react'

export default function DescriptionFormControl() {
  return (
    <FormControl id='description' isRequired>
      <FormLabel>Description</FormLabel>
      <Input name='description' placeholder='Enter description' />
    </FormControl>
  )
}
