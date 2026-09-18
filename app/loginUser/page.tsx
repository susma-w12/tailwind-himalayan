"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/app/actions/auth";
import { loginSchema, type LoginData } from "@/lib/validation";

export default function LoginPage() {
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginData, string>>
  >({});
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    setErrors({});
    setMessage("");

    const formData = new FormData(form);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = loginSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });

      return;
    }

    const response = await loginUser(formData);

    if (!response.success) {
      setMessage(response.message || "Login failed");
      return;
    }

    setMessage(`Login successful. Role: ${response.role}`);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Login
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your email and password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <Input
              id="email"
              name="email"
              type="email"
            />

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

            <Input
              id="password"
              name="password"
              type="password"
            />

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
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <a
            href="/registerUser"
            className="font-medium text-gray-900 hover:underline"
          >
            Register
          </a>
        </p>
      </section>
    </main>
  );
}