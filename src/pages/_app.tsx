import React from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from 'next-auth/react'
import Router from 'next/router'
import '@/styles/globals.css'

interface AppPropsWithAuth extends AppProps {
  Component: AppProps['Component'] & { auth: boolean }
}
const App = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithAuth): React.ReactElement => {
  return (
    <SessionProvider session={ session }>
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
