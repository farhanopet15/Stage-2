import bcrypt from "bcrypt";
import { prisma } from "../prisma/client";
import { signToken } from "../utils/jwt";

export async function loginSupplier(email: string, password: string) {
    const supplier = await prisma.supplier.findUnique({
        where: { email },
        // select: {
        //     id: true,
        //     email: true,
        //     password: true
        // }
    });
    console.log(password, supplier)
    if (!supplier) {
        throw new Error("Invalid credentials");
    }

    const isPasswordMatch = await bcrypt.compare(password, supplier.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid credentials");
    }

    const token = signToken({ id: supplier.id, role: "supplier" });
    return { token };
}

export async function addProduct(supplierId: number, productData: { name: string, price: number, description?: string }) {
    try {
        const product = await prisma.product.create({
            data: {
                title: productData.name,
                price: productData.price,
                stocks: {
                    create: {
                        supplierId: supplierId,
                        stock: 0
                    }
                }
            },
        });
        return product;
    } catch (err) {
        throw new Error("Failed to add product");
    }
}