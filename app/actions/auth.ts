"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema } from "@/lib/validation";

export async function registerUser(formData: FormData) {
  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    dateOfBirth: formData.get("dateOfBirth"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = registerSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, dateOfBirth, email, password } = result.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth),
      email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "Registration successful",
  };
}

export async function loginUser(formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  return {
    success: true,
    role: user.role,
  };
}