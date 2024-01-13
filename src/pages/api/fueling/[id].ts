import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const prisma = new PrismaClient()
const secret = process.env.SECRET

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method } = req
  const { id } = req.query

  const token = await getToken({ req, secret })

  if (token !== null) {
    if (method === 'GET') {
      const abastecimento = await prisma.abastecimentos.findUnique({
        where: {
          id: Number(id)
        }
      })

      res.status(200).json(abastecimento)
    } else if (method === 'PUT') {
      const { body } = req

      await prisma.abastecimentos.update({
        where: {
          id: Number(id)
        },
        data: body
      })

      res.status(200).json({ message: 'Abastecimento atualizado com sucesso!' })
    } else if (method === 'DELETE') {
      await prisma.abastecimentos.delete({
        where: {
          id: Number(id)
        }
      })

      res.status(200).json({ message: 'Abastecimento deletado com sucesso!' })
    } else {
      res.status(404).json({ message: 'Route not found' })
    }
  } else {
    res.status(401).json({ message: 'unauthorized' })
  }
}
