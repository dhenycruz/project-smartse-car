import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()
const secret = process.env.SECRET

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method } = req
  const { id } = req.query

  const token = await getToken({ req, secret })

  if (token !== null) {
    if (method === 'GET') {
      const car = await prisma.cars.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          modelo: true,
          marca: true,
          potencia: true,
          cor: true,
          portas: true,
          ar: true,
          renavam: true,
          placa: true,
          imgcar: true,
          estado: true,
          cidade: true,
          abastecimentos: true
        }
      })

      res.status(200).json({ data: car })
    } else if (method === 'PATCH') {
      const { modelo, marca, cor, potencia, portas, ar, placa, renavam, imgcar, estado, cidade } = req.body

      const car = await prisma.cars.findUnique({
        where: { id: Number(id) },
        select: {
          renavam: true,
          placa: true
        }
      })

      const dataBody = {
        modelo,
        marca,
        cor,
        potencia,
        portas: Number(portas),
        ar,
        renavam,
        imgcar,
        estado,
        placa,
        cidade
      }

      dataBody.renavam = String(renavam)

      if (car?.renavam === String(renavam)) {
        delete dataBody.renavam
      }

      if (car?.placa === placa) {
        delete dataBody.placa
      }

      await prisma.cars.update({
        where: {
          id: Number(id)
        },
        data: dataBody
      })

      res.status(200).json({ message: 'Carro atualizado com sucesso!' })
    } else if (method === 'DELETE') {
      await prisma.cars.delete({
        where: { id: Number(id) }
      })

      res.status(200).json({ message: 'Carro deletado com sucesso!' })
    }

    res.status(404).json({ message: 'Rout not found' })
  }

  res.status(401).json({ message: 'unauthorized' })
}
