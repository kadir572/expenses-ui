import { auth } from '@/auth'
import Navbar from '../nav/Navbar'

export default async function Header() {
  const session = await auth()
  if (!session) return <div>500 - Internal server error</div>
  return (
    <header>
      <Navbar username={session.username} role={session.role} />
    </header>
  )
}
