import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      name: string
      email: string
    }
  }

  interface User {
    id: string
    name: string
    email: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    name: string
    email: string
  }
}
