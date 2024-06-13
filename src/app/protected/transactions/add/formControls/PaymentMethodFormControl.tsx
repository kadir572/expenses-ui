import { PaymentMethod } from '@/lib/types/transaction.type'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'

export default function PaymentMethodFormControl() {
  return (
    <FormControl id='paymentMethod' isRequired>
      <FormLabel>Payment Method</FormLabel>
      <Select name='paymentMethod'>
        {Object.values(PaymentMethod).map(method => (
          <option key={method} value={method}>
            {method.charAt(0).toUpperCase() + method.slice(1)}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}
