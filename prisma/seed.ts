import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()
async function main() {
    for (let i = 0; i < 15; i++) {
        await prisma.payments.create({
            data: {
                member_id: faker.number.int({ min: 1, max: 10 }),
                amount: faker.number.int({ min: 1000, max: 10000 }),
                paid_at: faker.date.past(),
            }
        })
    }
  
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