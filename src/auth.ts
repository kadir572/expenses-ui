import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { signInSchema } from './lib/zod'
import { jwtDecode } from 'jwt-decode'
import { DecodedToken } from './lib/types/jwt-decode.type'
import { logout } from './app/actions'

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        // throw new CustomError()
        // const { username, password } = await signInSchema.parseAsync(
        //   credentials
        // )

        if (!credentials.username || !credentials.password) return null

        const { username, password } = credentials

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: 'POST',
            body: JSON.stringify({
              username,
              password,
            }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        )

        if (res.status === 500) {
          throw new Error('Internal server error')
        }

        if (res.status === 401) return null
        const data = await res.json()
        return {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          username: data.user.username,
          role: data.user.role,
          userID: data.user.id,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // If token present but jwt not called by signIn
      if (trigger !== 'signIn' && token.accessTokenExpires) {
        // if access token expired
        if (Date.now() >= token.accessTokenExpires) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${token.refreshToken}`,
                },
              }
            )

            const data = await res.json()

            if (!data.accessToken) throw new Error('Refresh endpoint failed')

            token.accessToken = data.accessToken
            token.refreshToken = data.refreshToken
            token.accessTokenExpires =
              jwtDecode<DecodedToken>(data.accessToken).exp * 1000
            token.refreshTokenExpires =
              jwtDecode<DecodedToken>(data.refreshToken).exp * 1000
            console.log('tokens refreshed')
          } catch (error) {
            token.error = 'RefreshAccessTokenError'
            console.log('refresh token expired, logging out')
            await logout()
          }
        }
      }
      if (user && user.accessToken) {
        token.username = user.username
        token.role = user.role
        token.userID = user.userID
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.accessTokenExpires =
          jwtDecode<DecodedToken>(user.accessToken).exp * 1000
        token.refreshTokenExpires =
          jwtDecode<DecodedToken>(user.refreshToken).exp * 1000
      }
      return token
    },
    async session({ session, token, user }) {
      if (token && token.accessToken) {
        session.username = token.username
        session.role = token.role
        session.userID = token.userID
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
        session.accessTokenExpires = token.accessTokenExpires
        session.refreshTokenExpires = token.refreshTokenExpires
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
  },
})
