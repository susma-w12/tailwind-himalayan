import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .regex(/^[A-Za-z]+$/, "First name can only contain letters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[A-Za-z]+$/, "Last name can only contain letters"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required"),

  email: z
    .string()
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type RegisterData = z.infer<typeof registerSchema>;

export type LoginData = z.infer<typeof loginSchema>;