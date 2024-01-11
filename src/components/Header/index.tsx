import React from 'react'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import Logo from '../../../public/logo.png'

const Header = (): React.ReactElement => {
  const { data: session } = useSession()

  console.log(session)

  return (
    <header className='w-full h-14 bg-black text-white flex justify-around items-center'>
      <Image src={Logo} alt='Logo' width={120}/>
      <div className='flex'>
        <h1 className='pr-2'>Bem vindo, { session?.user.name }!</h1>
        <button className='pl-2 pr-2 border border-slate-300 hover:bg-white hover:text-black' onClick={() => { void signOut({ redirect: false }) } }>Sair</button>
      </div>
    </header>
  )
}

export default Header
