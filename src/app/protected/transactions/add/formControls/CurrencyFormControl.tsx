import { getCurrencyDisplayName } from '@/lib/helpers/currency'
import { Currency } from '@/lib/types/transaction.type'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'

export default function CurrencyFormControl() {
  return (
    <FormControl id='currency' isRequired>
      <FormLabel>Currency</FormLabel>
      <Select
        name='currency'
        defaultValue={
          Object.values(Currency).includes(Currency.chf) ? Currency.chf : ''
        }
      >
        {Object.values(Currency).map(currency => (
          <option key={currency} value={currency}>
            {getCurrencyDisplayName(currency)}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}
