import bcrypt from "bcrypt";
import { prisma } from "../prisma/client";
import { signToken } from "../utils/jwt";

export async function registerUser(email: string, password: string, profile: string) {
  if (!email.match(/@/) || password.length < 6) {
    throw new Error("Invalid email or password");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { 
      email, 
      password: hashed, 
      profile,  
      name: email.split('@')[0],
    },
  });
  return user;
}

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Wrong password");

    const token = signToken({ id: user.id, role: user.role });
    return { token };
}