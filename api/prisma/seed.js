import { PrismaClient } from './client/index.js';
const data = {
    bankCompany: [
        { id: '52082553-a0e9-4bbd-a9b9-0f66d0e3e48e', name: 'BBVA' },
        { id: '8d635f03-6137-4ca8-be6c-b158bbf65a17', name: 'Sabadell' },
        { id: '1237b5ee-19d1-45db-ba2c-7a92912b8abe', name: 'Caixa' },
        { id: '42525e02-828e-4ac5-bf4f-3d763dd349ad', name: 'Abanca' },
    ],
    insuranceCompany: [
        { id: 'fb9459f8-9048-4014-b2fa-0ce457337d38', name: 'Mapfre' },
        { id: 'f5641989-bc26-4fff-9604-538db9067091', name: 'AXA' },
        { id: 'ae03f252-048f-42e1-9641-6eb8c26d5027', name: 'Allianz' },
        { id: '3b094da4-7683-49ca-8f54-900abc1cc12d', name: 'Catalana' },
    ],
};
const prisma = new PrismaClient();
async function main() {
    for (const bank of data.bankCompany) {
        await prisma.bankCompany.upsert({
            where: { id: bank.id },
            update: {},
            create: {
                name: bank.name,
            },
        });
    }
    for (const insuranceCompany of data.insuranceCompany) {
        await prisma.insuranceCompany.upsert({
            where: { id: insuranceCompany.id },
            update: {},
            create: {
                name: insuranceCompany.name,
            },
        });
    }
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
