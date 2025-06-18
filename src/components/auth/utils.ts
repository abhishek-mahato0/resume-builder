"use server";
import { signIn } from "@/auth";
import { prisma } from "@/db/db";

export const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // const formData = new FormData(e.currentTarget);
  // const email = formData.get("email") as string;
  // const password = formData.get("password") as string;

  // Call your sign-in function here
  try {
    await signIn("google");
    // Redirect or show success message
  } catch (error) {
    console.error("Login failed:", error);
    // Handle error (e.g., show error message)
  }
};

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
