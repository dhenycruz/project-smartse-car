import React from 'react'
import Image from 'next/image'
import Logo from '../../public/logo.png'
import Frota from '../../public/frota-img.png'

const Login = (): React.ReactElement => {
  return (
    <div className="w-screen h-screen bg-[url('../../public/bg.png')] bg-cover text-cente ">
      <div className=" w-screen h-screen flex justify-center items-center  backdrop-blur bg-black/90">
        <Image src={Frota} alt='imagem frota' width={500} className='sm: hidden md:block mr-20' />
        <div className='flex flex-col p-7'>
          <Image src={Logo} alt='Logo da aplicação' width={250} />
          <input type='text' maxLength={11} className='bg-transparent text-white mt-4 mb-8 p-1 border-b-2 border-white' placeholder='CPF'/>
          <input type='password' className='bg-transparent text-white mb-10 p-1 border-b-2 border-white' placeholder='Senha'/>
          <button className='p-4 bg-green-900 text-white rounded-md'>ENTRAR</button>
        </div>
      </div>
    </div>
  )
}

export default Login
