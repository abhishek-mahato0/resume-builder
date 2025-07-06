/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/auth/db";
import bcrypt from "bcryptjs";
import { sendEmail } from "./mailer";
import { signIn } from "@/auth";

export const handleCredentialsSignIn = async (
  _: any,
  formData: FormData
) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are required fields.", 
        user: null,
      };
    }
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })
    if (result?.error) {
      return {
        success: false,
        message: "Invalid email or password.",
        user: null,
      };
    } else {
      return {
        success: true,
        message: "Login successful.",
        user: result.user,
      };
    }
  } catch (err) {
    console.error("Error in handleCredentialsSignIn:", err);
    return {
      success: false,
      message: "Failed to sign in with credentials.", 
    };
  }
}

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
    const html = ` <div style="font-family: Arial, sans-serif; padding: 20px; background: #f7f7f7;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 8px;">
          <h2 style="color: #333;">Welcome to <span style="color: #4F46E5;">ResumeCraft</span>!</h2>
          <p style="font-size: 16px;">Please verify your email address to start building your professional resume:</p>
          <a href="${verificationUrl}" style="display: inline-block; padding: 12px 20px; margin: 20px 0; background: #4F46E5; color: #fff; text-decoration: none; border-radius: 6px;">Verify Email</a>
          <p style="font-size: 14px; color: #777;">If you didn’t create an account, you can safely ignore this email.</p>
          <hr style="margin: 30px 0;" />
          <p style="font-size: 12px; color: #aaa;">ResumeCraft © ${new Date().getFullYear()}</p>
        </div>
      </div>`;
    await sendEmail({ to: email, subject: "Verify your email- ResumeCraft", html });
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
  formData: FormData
) => {
  try {
    const password = formData.get("newPassword") as string;
    const currPassword = formData.get("confirmPassword") as string;
    const token = formData.get("token") as string;
    const email = formData.get("email") as string;
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
    const user = await prisma.user.findUnique({
      where: { email, forgetPasswordToken: token },
    });

    if (!user) {
      return {
        success: false,
        message: "Invalid or expired token.",
      };
    }
        if (!user.password) {
      return {
        success: false,
        message: "You have registered using Google, please login with Google.",
      };
    }

    if (
      !user.forgetPasswordTokenExpires ||
      user.forgetPasswordTokenExpires < new Date()
    ) {
      return {
        success: false,
        message: "Token has expired.",
      };
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email: email, forgetPasswordToken: token },
      data: {
        password: hashedPassword,
        emailVerified: new Date(),
        forgetPasswordToken: null,
        forgetPasswordTokenExpires: null,
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

export const forgetPassword = async (_:any, formData:FormData) => {
  try {
    const email = formData.get("email") as string;
    if (!email) {
      return {
        success: false,
        message: "Email is required.",
      };
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    if(!user.password){
      return {
        success: false,
        message: "You have registered using Google, please login with Google.",
      };
    }

    if(!user.emailVerified){
      return {
        success: false,
        message: "Please verify your email before resetting the password.",
      };
    }
  
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
       forgetPasswordToken: token,
       forgetPasswordTokenExpires: expires,
      },
    });

    const resetUrl = `${process.env.MY_URL}/login/new-password?token=${token}&email=${email}`;
    const html=  `<div style="font-family: Arial, sans-serif; padding: 20px; background: #f7f7f7;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 8px;">
          <h2 style="color: #333;">Reset Your Password</h2>
          <p style="font-size: 16px;">We received a request to reset your password. Click below to proceed:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 20px; margin: 20px 0; background: #EF4444; color: #fff; text-decoration: none; border-radius: 6px;">Reset Password</a>
          <p style="font-size: 14px; color: #777;">If you didn’t request this, no worries—just ignore this message.</p>
          <hr style="margin: 30px 0;" />
          <p style="font-size: 12px; color: #aaa;">ResumeCraft © ${new Date().getFullYear()}</p>
        </div>
      </div>`;

    await sendEmail({ to: email, subject: "Reset Your Password – ResumeCraft", html });

    return {
      success: true,
      message: "Check your email for the reset link.",
    };
  } catch {
    return {
      success: false,
      message: "Error occured while changing password",
    };
  }
};
