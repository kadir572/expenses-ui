'use client'

import { createTransaction } from '@/app/actions'
import { Category } from '@/lib/types/Category'
import { Interval } from '@/lib/types/transaction.type'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Select,
  Switch,
  VStack,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import NameFormControl from './formControls/NameFormControl'
import DescriptionFormControl from './formControls/DescriptionFormControl'
import AmountFormControl from './formControls/AmountFormControl'
import PaymentMethodFormControl from './formControls/PaymentMethodFormControl'
import PurchaseLocationFormControl from './formControls/PurchaseLocationFormControl'

type Props = {
  categories: Category[]
}

export default function Form({ categories }: Props) {
  const toast = useToast()
  const {
    data,
    isPending,
    mutate: server_createTransaction,
  } = useMutation({
    mutationFn: createTransaction,
  })
  const formWidth = useBreakpointValue({ base: 'full', md: 'md' })
  const spacing = useBreakpointValue({ base: '4', md: '6' })

  const [isRecurring, setIsRecurring] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category)
  }
  useEffect(() => {
    if (isPending || !data) return

    if (data.statusCode === 400) {
      toast({
        title: 'Validation Error',
        description: 'One or more fields are invalid. Please check below.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
    } else if (data.statusCode) {
      toast({
        title: 'Error',
        description: 'An unexpected error occured. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
    } else {
      toast({
        title: 'Transaction Created',
        description: 'The transaction has been sucessfully created',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
    }
  }, [isPending, data, toast])
  return (
    <Box
      maxW={formWidth}
      mx='auto'
      my='8'
      p='4'
      boxShadow='md'
      borderRadius='md'
    >
      <Heading size='lg' mb='4'>
        Add Transaction
      </Heading>
      <form action={server_createTransaction}>
        <VStack spacing={spacing}>
          <NameFormControl />
          <DescriptionFormControl />
          <Box w='100%'>
            <HStack spacing={spacing}>
              <AmountFormControl />
            </HStack>
          </Box>
          <PaymentMethodFormControl />
          <PurchaseLocationFormControl />
          <FormControl id='transactionDate' isRequired>
            <FormLabel>Transaction Date</FormLabel>
            <Input
              name='date'
              type='date'
              defaultValue={new Date().toISOString().substring(0, 10)}
            />
          </FormControl>
          <FormControl id='recurring'>
            <HStack justify='space-between'>
              <FormLabel>Recurring</FormLabel>
              <Switch
                name='recurring'
                onChange={e => setIsRecurring(e.target.checked)}
              />
            </HStack>
          </FormControl>

          {isRecurring && (
            <FormControl id='interval' isRequired>
              <FormLabel>Interval</FormLabel>
              <Select name='interval'>
                {Object.values(Interval).map(interval => (
                  <option key={interval} value={interval}>
                    {interval}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}

          {isRecurring && (
            <FormControl id='nextRunDate' isRequired>
              <FormLabel>Next Run Date</FormLabel>
              <Input name='nextRunDate' type='date' />
            </FormControl>
          )}
          <FormControl id='category' isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              value={selectedCategory ? selectedCategory.id.toString() : ''}
              onChange={e => {
                const categoryId = parseInt(e.target.value)
                const category = categories.find(cat => cat.id === categoryId)
                if (category) {
                  handleCategoryChange(category)
                }
              }}
            >
              <option value=''>Select category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
          {selectedCategory && (
            <FormControl id='subcategory' isRequired>
              <FormLabel>Subcategory</FormLabel>
              <Select name='subcategoryId' defaultValue=''>
                <option value=''>Select subcategory</option>
                {selectedCategory.subcategories.map(subcategory => (
                  <option
                    key={subcategory.id}
                    value={subcategory.id.toString()}
                  >
                    {subcategory.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            type='submit'
            colorScheme='teal'
            width='full'
            disabled={isPending}
          >
            {isPending ? 'Adding Transaction...' : 'Add Transaction'}
          </Button>
          {!isPending && data && data.statusCode === 400 && (
            <Box>
              <Heading size='md'>Validation Errors</Heading>
              <ul>
                {data.message.map((err: string, index: number) => (
                  <li className='text-red-500' key={index}>{`- ${err}`}</li>
                ))}
              </ul>
            </Box>
          )}
        </VStack>
      </form>
    </Box>
  )
}
