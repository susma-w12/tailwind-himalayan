"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/app/actions/auth";
import { registerSchema, type RegisterData } from "@/lib/validation";

export default function RegisterPage() {
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterData, string>>
  >({});
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    setErrors({});
    setMessage("");

    const formData = new FormData(form);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      dateOfBirth: formData.get("dateOfBirth"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = registerSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        firstName: fieldErrors.firstName?.[0],
        lastName: fieldErrors.lastName?.[0],
        dateOfBirth: fieldErrors.dateOfBirth?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });

      return;
    }

    const response = await registerUser(formData);

    if (!response.success) {
      setMessage(response.message || "Registration failed");
      return;
    }

    setMessage(response.message || "Registration successful");
    form.reset();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Create an Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your details to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                First Name
              </label>

              <Input id="firstName" name="firstName" type="text" />

              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>

              <Input id="lastName" name="lastName" type="text" />

              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="dateOfBirth"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>

            <Input id="dateOfBirth" name="dateOfBirth" type="date" />

            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-500">
                {errors.dateOfBirth}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <Input id="email" name="email" type="email" />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <Input id="password" name="password" type="password" />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          {message && (
            <p className="text-center text-sm text-gray-700">
              {message}
            </p>
          )}

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/loginUser"
            className="font-medium text-gray-900 hover:underline"
          >
            Login
          </a>
        </p>
      </section>
    </main>
  );
}