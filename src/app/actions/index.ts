'use server'

import { auth, signIn, signOut } from '../../auth'
import { AuthError } from 'next-auth'

export async function login(prevState: any, formData: FormData) {
  try {
    const username = formData.get('username')
    const password = formData.get('password')

    if (!username || !password)
      return { message: 'Invalid credentials', status: 'error' }

    await signIn('credentials', {
      username,
      password,
      redirect: true,
      redirectTo: '/',
    })

    return { message: 'Success', status: 'success' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: 'Invalid credentials',
            status: 'error',
          }
        default:
          return {
            message: 'Internal server error',
            status: 'error',
          }
      }
    }
    throw error
  }
}

export async function logout() {
  await signOut({ redirect: true, redirectTo: '/auth/login' })
}

export async function createTransaction(formData: FormData) {
  console.log(formData)
  const transactionData: any = {}
  formData.forEach((value, key) => {
    if (!isNaN(Number(value))) {
      transactionData[key] = Number(value)
    } else if (key === 'recurring') {
      transactionData[key] = value === 'on'
    } else if (key === 'nextRunDate' || key === 'date') {
      transactionData[key] = new Date(value as string).toISOString()
      console.log(transactionData[key])
    } else {
      transactionData[key] = value
    }
  })
  const session = await auth()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(transactionData),
  })
  console.log(res.status)
  const data = await res.json()
  console.log(data)
  return data
}
