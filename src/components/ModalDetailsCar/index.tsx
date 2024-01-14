/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Cars, Abastecimentos } from '@prisma/client'
import React from 'react'

interface ICar extends Cars {
  abastecimentos: Abastecimentos[]
}

interface Props {
  setOpenDetails: (param: boolean) => void
  car: ICar
}

const ModalDetailCar: React.FC<Props> = ({ setOpenDetails, car }): React.ReactElement => {
  const formtData = (date: Date): string => {
    const data = new Date(date)
    return data.toLocaleString('pt-BR')
  }

  const formCurrencyBr = (currency: string): string => {
    return Number(currency).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <div className='w-auto rounded-lg border border-black bg-white z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 flex justify-center  items-center flex-col'>
      <h2 className='font-bold mb-2'>Detalhes {car.marca} {car.modelo}</h2>
      <hr />
      <div className='flex'>
        <img src={car.imgcar} alt='imagem do carro' width={250} className='mr-2'/>
        <div className='w-96 p-2 border border-slap-300'>
          <h2 className='font-bold'>Detalhes</h2>
          <div className='grid grid-cols-2 gap-1'>
            <span><sub className='font-bold'>Marca:</sub> {car.marca}</span>
            <span><sub className='font-bold'>Modelo:</sub> {car.modelo}</span>
            <span><sub className='font-bold'>Cor:</sub> {car.cor}</span>
            <span><sub className='font-bold'>Potência:</sub> {car.potencia}</span>
            <span><sub className='font-bold'>Portas:</sub> {car.portas} portas</span>
            <span><sub className='font-bold'>Ar:</sub> {car.ar ? 'Sim' : 'Não'}</span>
            <span><sub className='font-bold'>Renavam:</sub> {car.renavam}</span>
            <span><sub className='font-bold'>Placa:</sub> {car.placa}</span>
            <span><sub className='font-bold'>Cidade:</sub> {car.cidade}</span>
            <span><sub className='font-bold'>estado:</sub> {car.estado}</span>
          </div>
        </div>
      </div>
      <div className='w-full h-full border border-slate-800 mt-4 flex flex-col items-center justify-center p-2'>
        <h2>Abastecimentos</h2>
        <hr />
        { (car.abastecimentos.length === 0)
          ? (<span className='font-semibold'>Não foi realizado nenhum abastecimento nesse veículo</span>)
          : (
          <table className='table-auto w-full border-collapse'>
            <thead>
              <tr className='border-b border-grey-300'>
                <th>#id</th>
                <th>Valor Litro</th>
                <th>Litros</th>
                <th>Valor Total</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              { car.abastecimentos.map((abastecimento: Abastecimentos, i: number) => (
                <tr key={i} className='border-b border-gray-100 text-center p-4'>
                  <td>#{abastecimento.id}</td>
                  <td>{formCurrencyBr(String(abastecimento.valorLitro))}</td>
                  <td>{String(Number(abastecimento.litros).toFixed(2))}</td>
                  <td>{formCurrencyBr(String(abastecimento.valorTotal))}</td>
                  <td>{formtData(abastecimento.data)}</td>
                </tr>
              ))}
            </tbody>
          </table>
            )}
      </div>
      <button
          className='mt-4 p-2 bg-slate-400 boreder border-gray-100'
          onClick={ () => { setOpenDetails(false) }}
        >
          Fechar
        </button>
    </div>
  )
}

export default ModalDetailCar
