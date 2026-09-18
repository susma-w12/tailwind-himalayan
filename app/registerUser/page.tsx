import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
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

        <form className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                First Name
              </label>

              <Input
                id="firstName"
                name="firstName"
                type="text"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>

              <Input
                id="lastName"
                name="lastName"
                type="text"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="dateOfBirth"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>

            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
            />
          </div>

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
          </div>

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