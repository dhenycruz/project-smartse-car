import { PrismaClient } from '@prisma/client'
import { type NextApiRequest, type NextApiResponse } from 'next'

const prisma = new PrismaClient()
// onst secret = process.env.SECRET

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method } = req

  // const token = await getToken({ req, secret })

  if (method === 'GET') {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true
      }
    })

    res.status(200).json({ data: users })
  }
}
