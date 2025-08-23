import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  await prisma.supplierStock.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.pointTransaction.deleteMany();

  await prisma.product.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.user.deleteMany();

  const johan = await prisma.user.create({
    data: {
      name: "Johan",
      email: "johan@mail.com",
      password: "123456",
      points: 200,
    },
  });
  const aizen = await prisma.user.create({
    data: {
      name: "Aizen",
      email: "aizen@mail.com",
      password: "123456",
      points: 150,
    },
  });
  const madara = await prisma.user.create({
    data: {
      name: "Madara",
      email: "madara@mail.com",
      password: "123456",
      points: 100,
    },
  });

  // Seed Products
  const surya = await prisma.product.create({
    data: { title: "Surya", price: 12000 },
  });
  const classMild = await prisma.product.create({
    data: { title: "ClassMild", price: 12000 },
  });
  const marlboro = await prisma.product.create({
    data: { title: "Marlboro", price: 15000 },
  });
  const cansas = await prisma.product.create({
    data: { title: "Cansas", price: 10000 },
  });
  const pencil = await prisma.product.create({
    data: { title: "Pencil", price: 5000 },
  });

  // Seed Cart
  await prisma.cart.createMany({
    data: [
      { userId: johan.id, productId: surya.id, quantity: 2 },
      { userId: johan.id, productId: classMild.id, quantity: 1 },
      { userId: aizen.id, productId: marlboro.id, quantity: 3 },
      { userId: aizen.id, productId: cansas.id, quantity: 4 },
      { userId: aizen.id, productId: pencil.id, quantity: 2 },
      { userId: madara.id, productId: marlboro.id, quantity: 3 },
    ],
  });

  await prisma.pointTransaction.createMany({
    data: [
      { senderId: johan.id, receiverId: aizen.id, amount: 50 },
      { senderId: aizen.id, receiverId: madara.id, amount: 30 },
      { senderId: madara.id, receiverId: johan.id, amount: 20 },
    ],
  });

  const supplierA = await prisma.supplier.create({
    data: { name: "Shopay" },
  });

  const supplierB = await prisma.supplier.create({
    data: { name: "Shopay bukan Jonay" },
  });

  await prisma.supplierStock.createMany({
    data: [
      { supplierId: supplierA.id, productId: surya.id, stock: 100 },
      { supplierId: supplierA.id, productId: marlboro.id, stock: 100 },
      { supplierId: supplierB.id, productId: classMild.id, stock: 100 },
      { supplierId: supplierB.id, productId: surya.id, stock: 100 },
      { supplierId: supplierB.id, productId: cansas.id, stock: 100 },
      { supplierId: supplierB.id, productId: pencil.id, stock: 100 },
    ],
  });

  console.log("✅ Database seeded!");
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
