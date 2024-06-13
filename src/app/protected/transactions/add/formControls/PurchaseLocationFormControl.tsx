import { PurchaseLocation } from '@/lib/types/transaction.type'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'

export default function PurchaseLocationFormControl() {
  return (
    <FormControl id='purchaseLocation' isRequired>
      <FormLabel>Purchase Location</FormLabel>
      <Select name='purchaseLocation'>
        {Object.values(PurchaseLocation).map(location => (
          <option key={location} value={location}>
            {location.charAt(0).toUpperCase() + location.slice(1)}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}
