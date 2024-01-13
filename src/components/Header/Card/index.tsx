import { type Cars } from '@prisma/client'
import React from 'react'

const Card = (props: Cars): React.ReactElement => {
  return (
    <div className='w-72 h-full border-solid border-2 rounded-md bg-white'>
      <img src={props.imgcar} alt='Foto veículo' />
      <h1 className='text-center font-bold mt-2'>{props.marca} {props.modelo} {props.potencia}</h1>
      <div className='flex flex-col text-center'>
        <span></span>
        <span>{props.cor} - {props.portas} Portas {props.ar ? '- AR' : 'não'}</span>
        <span>{props.cidade} - {props.estado}</span>
      </div>
      <div className='p-2'>
        <button className='bg-green-800 border p-2 rounded-lg mb-2 font-bold text-white border-slate-300 w-full'>ABASTECER</button>
        <button className='bg-white border border-slate-300 w-full p-2 font-semibold mb-2 rounded-lg'>Mais Detalhes</button>
        <button className='bg-red-800 border border-slate-300 w-full p-2 font-bold mb-2 rounded-lg'>DELETAR</button>
      </div>
    </div>
  )
}

export default Card
