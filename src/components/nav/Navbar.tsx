'use client'

import { logout } from '@/app/actions'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGauge,
  faGear,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'

type Props = {
  username: string
  role: string
}

export default function Navbar({ username, role }: Props) {
  const isMobile = useBreakpointValue({ base: true, md: false })

  const handleLogout = () => {
    // Logout logic
  }

  return (
    <Box as='nav' p='4' bg='teal.500' color='white'>
      {isMobile ? (
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            aria-label='Options'
            variant='outline'
            colorScheme='white'
          />
          <MenuList bgColor='teal.500'>
            <Link href='/'>
              <MenuItem bgColor='teal.500' gap='2'>
                <FontAwesomeIcon icon={faGauge} />
                Dashboard
              </MenuItem>
            </Link>
            <Link href='/protected/settings'>
              <MenuItem bgColor='teal.500' gap='2'>
                <FontAwesomeIcon icon={faGauge} />
                Settings
              </MenuItem>
            </Link>
            <MenuItem bgColor='teal.500' onClick={() => logout()} gap='2'>
              <FontAwesomeIcon icon={faRightFromBracket} />
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <HStack spacing='6'>
          <Link href='/' className='mr-auto'>
            <Button variant='link' colorScheme='white' gap='2'>
              <FontAwesomeIcon icon={faGauge} />
              Dashboard
            </Button>
          </Link>
          <Menu>
            <MenuButton as={Button} variant='link' colorScheme='white'>
              <Avatar name={username} size='sm' bg='white' color='teal.500' />
            </MenuButton>
            <MenuList bg='teal.500'>
              <Link href='/protected/settings'>
                <MenuItem bgColor='teal.500' gap='2'>
                  <FontAwesomeIcon icon={faGear} />
                  Settings
                </MenuItem>
              </Link>
              <MenuItem bgColor='teal.500' onClick={() => logout()} gap='2'>
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      )}
    </Box>
  )
}
