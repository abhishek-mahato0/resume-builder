/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/auth/db";
import bcrypt from "bcryptjs";
import { sendEmail } from "./mailer";

export const handleRegister = async (_: any, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    if (!email || !name || !password) {
      return {
        success: false,
        message: "Email, name, and password are required fields.",
        user: null,
      };
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, message: "User already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationToken: token,
        verificationTokenExpires: expires,
      },
    });

    const verificationUrl = `${process.env.MY_URL}/register/verify?token=${token}&email=${email}`;
    const html = `
      <h1>Welcome to ResumeCraft, ${name}!</h1>
      <p>Thank you for registering. Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `;
    await sendEmail({ to: email, subject: "Verify your email", html });
    console.log("User registered successfully:", user);
    return {
      success: true,
      message: "Registered! Check your email to verify.",
    };
  } catch (err) {
    console.error("Error registering user:", err);
    return {
      success: false,
      message: "Failed to register user.",
      user: null,
    };
  }
};

export const verifyUserEmail = async (token: string) => {
  const user = await prisma.user.findFirst({
    where: {
      verificationToken: token,
    },
  });

  if (
    !user ||
    !user.verificationTokenExpires ||
    user.verificationTokenExpires < new Date()
  ) {
    return { success: false, message: "Invalid or expired token." };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      verificationToken: null,
      verificationTokenExpires: null,
    },
  });

  return { success: true, message: "Email verified successfully." };
};

export const handleLogin = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    console.error("Error logging in user:", err);
    throw err;
  }
};

export const resetPassword = async (
  _: any,
  formData: FormData,
  email: string
) => {
  try {
    const password = formData.get("newPassword") as string;
    const currPassword = formData.get("confirmPassword") as string;
    if (!password || !currPassword) {
      return {
        success: false,
        message: "Password is required.",
      };
    }
    if (password !== currPassword) {
      return {
        success: false,
        message: "Password does not match.",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email: email },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Password changed successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Error occured while changing password",
    };
  }
};

export const forgetPassword = async () => {
  try {
  } catch {
    return {
      success: false,
      message: "Error occured while changing password",
    };
  }
};
