import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize: async (credentials) => {
        const { cpf, password } = credentials as {
          cpf: string
          password: string
        }

        const user = await prisma.user.findUnique({
          where: { cpf }
        })

        if (user === null) throw new Error('User not found')

        console.log(user)

        const verifyPassword = bcrypt.compareSync(password, user.password)

        console.log(verifyPassword)

        if (!verifyPassword) throw new Error('Password invalid')

        return { id: String(user.id), email: user.email, name: user.name }
      }
    })
  ],
  callbacks: {
    async session ({ session, token }) {
      if (session.user !== undefined) {
        session.user.id = token.id
      }

      return session
    },
    async jwt ({ user, token }) {
      if (user !== undefined) {
        token.id = user.id
        token.email = user.email
      }

      return token
    }
  },
  jwt: {
    secret: process.env.SECRET
  }
})
