import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const prisma = new PrismaClient()
const secret = process.env.SECRET

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method } = req

  const token = await getToken({ req, secret })

  if (token !== null) {
    if (method === 'GET') {
      const cars = await prisma.cars.findMany({
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

      res.status(200).json({ data: cars })
    } else if (method === 'POST') {
      const { body } = req
      const car = await prisma.cars.create({
        data: body
      })

      res.status(201).json(car)
    }

    res.status(404).json({ message: 'Route not found' })
  }

  res.status(401).json({ message: 'unauthorized' })
}
