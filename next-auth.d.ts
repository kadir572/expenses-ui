import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    username?: string
    role?: string
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    refreshTokenExpires?: number
    error?: string
  }

  interface User {
    accessToken: string
    refreshToken: string
    username: string
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username?: string
    role?: string
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    refreshTokenExpires?: number
    error?: string
  }
}
