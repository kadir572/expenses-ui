import { auth } from '@/auth'

import HeaderBar from './HeaderBar'
import ResponsiveDrawer from '../nav/ResponsiveDrawer'

export default function Header() {
  return (
    <>
      <HeaderBar />
      <ResponsiveDrawer />
    </>
  )
}
