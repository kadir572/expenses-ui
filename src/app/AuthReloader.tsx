'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

export default function AuthReloader({ children }: Props) {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.refresh()
    }
  }, [session, router])
  return children
}
