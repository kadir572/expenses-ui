import { Box, Flex, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <footer>
      <Flex
        as='footer'
        align='center'
        justify='center'
        py={4}
        bg='teal.500'
        color='white'
      >
        <Box textAlign='center'>
          <Text fontSize='sm'>
            &copy; {new Date().getFullYear()} Expense Tracker. All rights
            reserved.
          </Text>
          <Text fontSize='sm' mt={2}>
            Made with ❤️ by Kadir Karadavut
          </Text>
        </Box>
      </Flex>
    </footer>
  )
}
