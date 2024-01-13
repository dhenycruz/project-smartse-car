import React from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from 'next-auth/react'
import Router from 'next/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@/styles/globals.css'

interface AppPropsWithAuth extends AppProps {
  Component: AppProps['Component'] & { auth: boolean }
}
const App = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithAuth): React.ReactElement => {
  const queryClient = new QueryClient()

  return (
    <SessionProvider session={ session }>
      <QueryClientProvider client={queryClient}>
        {
          (Component?.auth)
            ? (
            <Auth>
              <Component { ...pageProps } />
            </Auth>
              )
            : (
            <Component { ...pageProps } />
              )
        }
      </QueryClientProvider>
    </SessionProvider>
  )
}

const Auth = ({ children }: { children: React.ReactElement }): React.ReactElement => {
  const { status } = useSession()

  if (status === 'unauthenticated') void Router.replace('/')

  if (status === 'loading') return (<div>Loading...</div>)

  return children
}

export default App
