import { PrismaClient } from "../generated/prisma";

export const prisma = new PrismaClient()

async function main() {
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

const users = await prisma.user.createMany({
    data : [
        { name: "Alice", email: "alice@gmail.com", points: 800},
        { name: "Bob", email: "bob@gmail.com", points: 1500},
        { name: "Charlie", email: "charlie@gmail.com", points: 2000},
        ],
    });

const products = await prisma.product.createMany({
    data : [
        { name: "Keyboard", price: 800_000, stock: 20},
        { name: "Mouse", price: 750_000, stock: 20},
        { name: "Monitor", price: 1_500_000, stock: 7},
        { name: "Laptop", price: 8_000_000, stock: 5},
        { name: "USB", price: 350_000, stock: 12},
        ],
    });

await prisma.order.createMany({
    data: [
        {userId: 1, productId: 1, quantity: 2},
        {userId: 1, productId: 2, quantity: 1},
        {userId: 2, productId: 3, quantity: 1},
        {userId: 2, productId: 4, quantity: 2},
        {userId: 3, productId: 2, quantity: 4},
        {userId: 3, productId: 5, quantity: 3},
        ],
    });
}

main()
    .then(() => {
        console.log("seeding completed");
    })
    .catch((e)=> {
        console.error(e);
    })
    .finally(async ()=> {
        await prisma.$disconnect();
    });