import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient

async function main() {
    const user = await prisma.user.upsert({
        where: { cpf: '01234567890'},
        update: {},
        create: {
            email: 'dheniarley@email.com',
            name: 'Dheniarley Cruz',
            password: '$2a$10$ELtbi2ZDbjw3UZIwXk9ny.W3DgF1u6NzxizoL.1q5l0YJwxmJ/w5.',
            cpf: '01234567890'
        }
    })

    console.log({ user })

    const car1 = await prisma.cars.upsert({
        where: { id: 1 },
        update: {},
        create: {
            modelo: 'Uno Vivace',
            marca: 'FIAT',
            potencia: '1.0',
            cor: 'Vermelho',
            portas: 4,
            ar: true,
            renavam: '0123456789',
            placa: 'AG4E654',
            imgcar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.wikipedia.org%2Fwiki%2FFicheiro%3AFiat_Uno_1.4_Vivace_2014_%252814411914451%2529.jpg&psig=AOvVaw2wgtmIHLQYmSHViGMY1HEv&ust=1704922079578000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPjq9uif0YMDFQAAAAAdAAAAABAE',
            estado: 'DF',
            cidade: 'Brasília'
        }
    })

    console.log({ car1 })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
