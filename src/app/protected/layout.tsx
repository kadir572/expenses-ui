import { auth } from '@/auth'
import Footer from '@/components/partials/Footer'
import Header from '@/components/partials/Header'

type Props = {
  children: React.ReactNode
}

export default async function ProtectedLayout({ children }: Props) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='grow'>{children}</main>
      <Footer />
    </div>
  )
}
