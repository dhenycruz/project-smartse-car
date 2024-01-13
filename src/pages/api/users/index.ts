import { PrismaClient } from '@prisma/client'
import { type NextApiRequest, type NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method } = req

  if (method === 'GET') {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        cpf: true,
        email: true
      }
    })

    res.status(200).json({ data: users })
    res.end()
  } else if (method === 'POST') {
    const { name, email, cpf, password } = req.body

    const verifyCPF = await prisma.user.findUnique({
      where: { cpf }
    })

    if (verifyCPF != null) res.status(409).json({ message: 'CPF já cadastrado.' })

    const verifyEmail = await prisma.user.findUnique({
      where: { email }
    })

    if (verifyEmail != null) res.status(409).json({ message: 'Email já cadastrado.' })

    const salt = await bcrypt.genSalt(10)
    const newPassowrd = await bcrypt.hash(String(password), salt)

    const user = await prisma.user.create({
      data: {
        name, email, cpf, password: newPassowrd
      }
    })

    res.status(201).json({ id: user.id, name: user.name, cpf: user.cpf })
    res.end()
  } else {
    res.status(404).json({ message: 'Route not found' })
  }
}
