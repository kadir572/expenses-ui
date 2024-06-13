'use client'

import { useFormState } from 'react-dom'
import { logout } from '../actions'

export default function Logout() {
  return (
    <form action={logout}>
      <button type='submit'>Sign Out Now</button>
    </form>
  )
}
