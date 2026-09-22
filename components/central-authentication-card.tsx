"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

interface CentralAuthenticationCardProps {
  onLogin?: (emailOrUsername: string, password: string) => void;
  forgotPasswordHref?: string;
  registerHref?: string;
  className?: string;
}

export default function CentralAuthenticationCard({
  onLogin,
  forgotPasswordHref = "#",
  className = "",
}: CentralAuthenticationCardProps) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onLogin) {
      onLogin(emailOrUsername, password);
    }
  };

  return (
    <div
      className={`w-full max-w-[520px] rounded-[8px] bg-[#131313]/40 p-12 border border-white/10 backdrop-blur-[24px] shadow-[0_20px_50px_0_rgba(0,0,0,0.5)] text-white ${className}`}
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="font-['Noto_Serif'] text-[32px] font-medium leading-[normal] text-[#E5E2E1]">
          Welcome Explorer
        </h1>

        <p className="mt-[7px] font-['Manrope'] text-[16px] font-normal leading-[normal] text-[#D0C5AF] opacity-80">
          Login here
        </p>
      </div>

      {/* Form Group */}
      <div className="mt-6 pt-4">
        <form onSubmit={handleSubmit}>
          {/* Email or Username */}
          <div>
            <label
              htmlFor="emailOrUsername"
              className="block font-['Manrope'] text-[14px] font-medium text-[#D0C5AF]"
            >
              EMAIL OR USERNAME
            </label>

            <div className="relative mt-2 flex items-center">
              <span className="pointer-events-none absolute left-4 text-[#D0C5AF]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10V11.45C20 12.4333 19.6625 13.2708 18.9875 13.9625C18.3125 14.6542 17.4833 15 16.5 15C15.9167 15 15.3667 14.875 14.85 14.625C14.3333 14.375 13.9 14.0167 13.55 13.55C13.0667 14.0333 12.5208 14.3958 11.9125 14.6375C11.3042 14.8792 10.6667 15 10 15C8.61667 15 7.4375 14.5125 6.4625 13.5375C5.4875 12.5625 5 11.3833 5 10C5 8.61667 5.4875 7.4375 6.4625 6.4625C7.4375 5.4875 8.61667 5 10 5C11.3833 5 12.5625 5.4875 13.5375 6.4625C14.5125 7.4375 15 8.61667 15 10V11.45C15 11.8833 15.1417 12.25 15.425 12.55C15.7083 12.85 16.0667 13 16.5 13C16.9333 13 17.2917 12.85 17.575 12.55C17.8583 12.25 18 11.8833 18 11.45V10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18H15V20H10ZM10 13C10.8333 13 11.5417 12.7083 12.125 12.125C12.7083 11.5417 13 10.8333 13 10C13 9.16667 12.7083 8.45833 12.125 7.875C11.5417 7.29167 10.8333 7 10 7C9.16667 7 8.45833 7.29167 7.875 7.875C7.29167 8.45833 7 9.16667 7 10C7 10.8333 7.29167 11.5417 7.875 12.125C8.45833 12.7083 9.16667 13 10 13Z"
                    fill="#D0C5AF"
                  />
                </svg>
              </span>

              <input
                id="emailOrUsername"
                name="emailOrUsername"
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="himalayantrail@gmail.com"
                required
                className="h-14 w-full rounded-[4px] border border-[#4D4635]/30 bg-[#20201F]/50 pl-12 pr-4 text-[#D0C5AF] placeholder-[#D0C5AF] focus:outline-none focus:ring-0 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block font-['Manrope'] text-[14px] font-medium text-[#D0C5AF]"
              >
                PASSWORD
              </label>

              <Link
                href={forgotPasswordHref}
                className="font-['Manrope'] text-[12px] font-medium text-[#F2CA50] transition-colors hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative mt-2 flex items-center">
              <span className="pointer-events-none absolute left-4 text-[#D0C5AF]">
                <svg
                  width="16"
                  height="21"
                  viewBox="0 0 16 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 21C1.45 21 0.979167 20.8042 0.5875 20.4125C0.195833 20.0208 0 19.55 0 19V9C0 8.45 0.195833 7.97917 0.5875 7.5875C0.979167 7.19583 1.45 7 2 7H3V5C3 3.61667 3.4875 2.4375 4.4625 1.4625C5.4375 0.4875 6.61667 0 8 0C9.38333 0 10.5625 0.4875 11.5375 1.4625C12.5125 2.4375 13 3.61667 13 5V7H14C14.55 7 15.0208 7.19583 15.4125 7.5875C15.8042 7.97917 16 8.45 16 9V19C16 19.55 15.8042 20.0208 15.4125 20.4125C15.0208 20.8042 14.55 21 14 21H2ZM2 19H14V9H2V19ZM8 16C8.55 16 9.02083 15.8042 9.4125 15.4125C9.80417 15.0208 10 14.55 10 14C10 13.45 9.80417 12.9792 9.4125 12.5875C9.02083 12.1958 8.55 12 8 12C7.45 12 6.97917 12.1958 6.5875 12.5875C6.19583 12.9792 6 13.45 6 14C6 14.55 6.19583 15.0208 6.5875 15.4125C6.97917 15.8042 7.45 16 8 16ZM5 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5V7ZM2 19V9V19Z"
                    fill="#D0C5AF"
                  />
                </svg>
              </span>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-14 w-full rounded-[4px] border border-[#4D4635]/30 bg-[#20201F]/50 pl-12 pr-12 text-[#D0C5AF] placeholder-[#D0C5AF] focus:outline-none focus:ring-0 transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 cursor-pointer text-[#D0C5AF] transition-colors hover:text-white focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Log In Button */}
          <button
            type="submit"
            className="mt-10 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#D4AF37] font-['Manrope'] text-[18px] font-semibold text-[#241A00] transition-all hover:bg-[#C19D2F]"
          >
            <span>Log In</span>

            <ArrowRight className="h-4 w-4 text-[#241A00]" strokeWidth={2.5} />
          </button>

          {/* OR Continue With */}
          <div className="mt-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[#D0C5AF]/30" />

              <span className="whitespace-nowrap font-['Manrope'] text-[11px] font-medium uppercase tracking-wider text-[#D0C5AF]">
                OR CONTINUE WITH
              </span>

              <div className="h-px flex-1 bg-[#D0C5AF]/30" />
            </div>
          </div>

          {/* Social Logins */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {/* Google */}
            <button
              type="button"
              aria-label="Continue with Google"
              className="flex h-[46px] w-full min-w-0 cursor-pointer items-center justify-center rounded-[4px] border border-[#D9D9D9]/30 bg-transparent px-4 py-3 transition-all hover:bg-white/10 sm:px-[54px]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.8 10.2085C18.8 9.5585 18.7417 8.9335 18.6333 8.3335H10V11.8835H14.9333C14.7167 13.0252 14.0667 13.9918 13.0917 14.6418V16.9502H16.0667C17.8 15.3502 18.8 13.0002 18.8 10.2085Z"
                  fill="#E5E2E1"
                />
                <path
                  d="M9.99998 19.1667C12.475 19.1667 14.55 18.35 16.0667 16.95L13.0917 14.6417C12.275 15.1917 11.2333 15.525 9.99998 15.525C7.61665 15.525 5.59165 13.9167 4.86665 11.75H1.81665V14.1167C3.32498 17.1083 6.41665 19.1667 9.99998 19.1667Z"
                  fill="#E5E2E1"
                />
                <path
                  d="M4.86659 11.7416C4.68325 11.1916 4.57492 10.6083 4.57492 9.99993C4.57492 9.3916 4.68325 8.80827 4.86659 8.25827V5.8916H1.81659C1.19159 7.12493 0.833252 8.5166 0.833252 9.99993C0.833252 11.4833 1.19159 12.8749 1.81659 14.1083L4.86659 11.7416Z"
                  fill="#E5E2E1"
                />
                <path
                  d="M9.99998 4.4835C11.35 4.4835 12.55 4.95016 13.5083 5.85016L16.1333 3.22516C14.5417 1.74183 12.475 0.833496 9.99998 0.833496C6.41665 0.833496 3.32498 2.89183 1.81665 5.89183L4.86665 8.2585C5.59165 6.09183 7.61665 4.4835 14.8666 4.4835H9.99998Z"
                  fill="#E5E2E1"
                />
              </svg>
            </button>

            {/* Apple */}
            <button
              type="button"
              aria-label="Continue with Apple"
              className="flex h-[46px] w-full min-w-0 cursor-pointer items-center justify-center rounded-[4px] border border-[#D9D9D9]/30 bg-transparent px-4 py-3 transition-all hover:bg-white/10 sm:px-[54px]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.2084 16.9C13.3917 17.6917 12.5001 17.6333 11.6417 17.2333C10.7334 16.8167 9.9084 16.8333 8.94173 17.2333C7.74173 17.75 7.1084 17.6 6.39173 16.9C4.02507 14.5833 2.91673 10.0333 5.22507 6.73333C6.3334 5.06667 7.82507 4.85 9.11673 5.63333C9.86673 6.08333 10.3501 6.09167 11.0917 5.63333C12.1584 4.98333 14.0167 4.84167 15.2584 6.59167C12.6751 8.11667 13.1084 11.3833 15.6917 12.55C15.1501 14.05 14.3834 15.5583 13.3751 16.9H14.2084ZM10.0251 6.04167C10.0084 4.18333 11.2834 2.6 12.9417 2.5C13.1334 4.6 11.1751 6.35833 10.0251 6.04167Z"
                  fill="#E5E2E1"
                />
              </svg>
            </button>

            {/* Facebook */}
            <button
              type="button"
              aria-label="Continue with Facebook"
              className="flex h-[46px] w-full min-w-0 cursor-pointer items-center justify-center rounded-[4px] border border-[#D9D9D9]/30 bg-transparent px-4 py-3 transition-all hover:bg-white/10 sm:px-[54px]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0001 1.7002C5.41675 1.7002 1.66675 5.44186 1.66675 10.0502C1.66675 14.2169 4.71675 17.6752 8.70008 18.3002V12.4669H6.58341V10.0502H8.70008V8.20853C8.70008 6.11686 9.94175 4.96686 11.8501 4.96686C12.7584 4.96686 13.7084 5.1252 13.7084 5.1252V7.18353H12.6584C11.6251 7.18353 11.3001 7.8252 11.3001 8.48353V10.0502H13.6167L13.2417 12.4669H11.3001V18.3002C15.2834 17.6752 18.3334 14.2169 18.3334 10.0502C18.3334 5.44186 14.5834 1.7002 10.0001 1.7002Z"
                  fill="#E5E2E1"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
