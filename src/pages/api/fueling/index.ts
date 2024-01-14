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
      const abastecimentos = await prisma.abastecimentos.findMany({
        select: {
          id: true,
          carId: true,
          tipoCombustivel: true,
          valorLitro: true,
          litros: true,
          valorTotal: true,
          data: true
        }
      })

      res.status(200).json({ data: abastecimentos })
    } else if (method === 'POST') {
      const { body } = req
      const abastecimento = await prisma.abastecimentos.create({
        data: body
      })

      res.status(201).json({ message: 'Carro abastecido com sucesso!', result: abastecimento })
    } else {
      res.status(404).json({ message: 'Route not found' })
    }
  } else {
    res.status(401).json({ message: 'unauthorized' })
  }
}
