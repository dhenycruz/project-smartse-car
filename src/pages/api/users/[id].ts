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
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id)
        },
        select: {
          id: true,
          name: true,
          email: true,
          cpf: true
        }
      })

      res.status(200).json({ data: user })
    } else if (method === 'PUT') {
      const { body } = req

      await prisma.user.update({
        where: { id: Number(id) },
        data: body
      })

      res.status(200).json({ message: 'Usuário atualizado com sucesso!' })
    } else if (method === 'DELETE') {
      await prisma.user.delete({
        where: { id: Number(id) }
      })

      res.status(200).json({ message: 'Usuário deletado com sucesso!' })
    } else {
      res.status(404).json({ message: 'Route not found' })
    }
  }

  res.status(401).json({ message: 'unauthorized' })
}
