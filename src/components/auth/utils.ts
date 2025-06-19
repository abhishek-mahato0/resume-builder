"use server";
import { prisma } from "@/db/db";

export const handleAuth = async (
  e: React.FormEvent<HTMLFormElement>,
  currentForm: string
) => {
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  if (currentForm === "login") {
    handleLogin(email, password);
  } else {
    handleRegister(name, email, password);
  }
};

export const handleRegister = async (name,email, password) => {
  
};

export const handleLogin = async (email, password) => {};

export const createUser = async () => {
  try {
    const email = "mahatoaaaa277777gmail.com";

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return existingUser;
    }

    const user = await prisma.user.create({
      data: { email },
    });

    return user;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};
