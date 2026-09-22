"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  AtSign,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

interface RegisterUserCardProps {
  onRegister?: (data: {
    email: string;
    username: string;
    password: string;
  }) => void;
  loginHref?: string;
  termsHref?: string;
  privacyHref?: string;
  className?: string;
}

export default function RegisterUserCard({
  onRegister,
  loginHref = "/login",
  termsHref = "#",
  privacyHref = "#",
  className = "",
}: RegisterUserCardProps) {
  
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    if (onRegister) {
      onRegister({     
        email,
        username,
        password,
      });
    }
  };

  return (
    <div
      className={`flex w-full max-w-[512px] flex-col gap-8 rounded-[24px] border border-white/[12.5%] bg-[#111827]/70 pt-[88px] pr-10 pb-[88px] pl-10 text-white backdrop-blur-[24px] ${className}`}
    >
      <div className="text-center">
        <h1 className="font-['Noto_Serif_Display'] text-[36px] font-bold leading-[40px] text-[#F1F5F9]">
          Become Explorer
        </h1>

        <p className="font-['Inter'] text-[16px] font-normal leading-[24px] text-[#94A3B8]">
          Create an Account
        </p>
      </div>

      {/* 2. OR SIGN UP WITH */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-white/15" />

        <span className="shrink-0 font-['Inter'] text-[10px] font-semibold tracking-wider text-[#64748B] sm:text-[11px]">
          OR SIGN UP WITH
        </span>

        <div className="h-px flex-1 bg-white/15" />
      </div>

      {/* 3. Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Address */}
        <div className="relative flex items-center">
          <span className="pointer-events-none absolute left-4 text-[#94A3B8]">
            <Mail className="h-5 w-5" />
          </span>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="h-12 w-full rounded-[12px] border border-white/10 bg-white/5 pl-12 pr-4 font-['Inter'] text-[16px] font-normal text-white placeholder:text-[#94A3B8] placeholder:opacity-100 transition-all focus:outline-none focus:ring-0 sm:h-13"
          />
        </div>

        {/* Username */}
        <div className="relative flex items-center">
          <span className="pointer-events-none absolute left-4 text-[#94A3B8]">
            <AtSign className="h-5 w-5" />
          </span>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="h-12 w-full rounded-[12px] border border-white/10 bg-white/5 pl-12 pr-4 font-['Inter'] text-[16px] font-normal text-white placeholder:text-[#94A3B8] placeholder:opacity-100 transition-all focus:outline-none focus:ring-0 sm:h-13"
          />
        </div>

        {/* Password */}
        <div className="relative flex items-center">
          <span className="pointer-events-none absolute left-4 text-[#94A3B8]">
            <Lock className="h-5 w-5" />
          </span>

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="h-12 w-full rounded-[12px] border border-white/10 bg-white/5 pl-12 pr-12 font-['Inter'] text-[16px] font-normal text-white placeholder:text-[#94A3B8] placeholder:opacity-100 transition-all focus:outline-none focus:ring-0 sm:h-13"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 cursor-pointer text-[#94A3B8] transition-colors hover:text-white focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative flex items-center">
          <span className="pointer-events-none absolute left-4 text-[#94A3B8]">
            <ShieldCheck className="h-5 w-5" />
          </span>

          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="h-12 w-full rounded-[12px] border border-white/10 bg-white/5 pl-12 pr-12 font-['Inter'] text-[16px] font-normal text-white placeholder:text-[#94A3B8] placeholder:opacity-100 transition-all focus:outline-none focus:ring-0 sm:h-13"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-4 cursor-pointer text-[#94A3B8] transition-colors hover:text-white focus:outline-none"
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Terms and Privacy Checkbox */}
        <div className="flex items-center gap-3 pt-1">
          <input
            id="terms"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded-[4px] border border-white/10 bg-white/5 focus:outline-none focus:ring-0"
          />

          <label
            htmlFor="terms"
            className="cursor-pointer select-none font-['Inter'] text-[14px] font-normal leading-[20px] text-[#CBD5E1]"
          >
            I agree to{" "}
            <Link
              href={termsHref}
              className="text-[#D4AF37] underline transition-colors hover:text-[#e5c45a]"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href={privacyHref}
              className="text-[#D4AF37] underline transition-colors hover:text-[#e5c45a]"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Error */}
        {error && (
          <p className="font-['Inter'] text-xs font-medium text-red-400">
            {error}
          </p>
        )}

        {/* Create Account */}
        <button
          type="submit"
          className="mt-2 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#D4AF37] font-['Inter'] text-[16px] font-bold leading-[24px] text-[#0F172A] shadow-[0_6px_22px_rgba(216,163,43,0.35)] transition-all hover:bg-[#c69324] active:scale-[0.99] sm:h-13"
        >
          <span>Create Account</span>

          <ArrowRight className="h-5 w-5 stroke-[2.5]" />
        </button>
      </form>

      {/* 4. Social Media */}
      <div className="grid grid-cols-3 gap-3">
        {/* Google */}
        <button
          type="button"
          className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 font-['Inter'] text-[14px] font-normal leading-[20px] transition-all text-[#F1F5F9] hover:bg-white/15 sm:h-12"
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.24v3.15C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.59H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.41l4.04-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.59l4.04 3.15c.95-2.84 3.6-4.99 6.72-4.99z"
            />
          </svg>

          <span>Google</span>
        </button>

        {/* Apple */}
        <button
          type="button"
          className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 font-['Inter'] text-[14px] font-normal leading-[20px] transition-all hover:bg-white/15 text-[#F1F5F9] sm:h-12"
        >
          <svg className="h-4 w-4 shrink-0 fill-white" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-1 .04-2.16.66-2.84 1.46-.59.69-1.11 1.83-.97 2.93 1.11.08 2.16-.55 2.82-1.35z" />
          </svg>

          <span>Apple</span>
        </button>

        {/* Facebook */}
        <button
          type="button"
          className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 font-['Inter'] text-[14px] font-normal leading-[20px] transition-all text-[#F1F5F9] hover:bg-white/15 sm:h-12"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_13_151)">
              <path
                d="M16 8C16 3.58175 12.4183 0 8 0C3.58175 0 0 3.58175 0 8C0 11.993 2.9255 15.3027 6.75 15.9028V10.3125H4.71875V8H6.75V6.2375C6.75 4.2325 7.94438 3.125 9.77175 3.125C10.647 3.125 11.5625 3.28125 11.5625 3.28125V5.25H10.5538C9.55994 5.25 9.25 5.86669 9.25 6.49937V8H11.4688L11.1141 10.3125H9.25V15.9028C13.0745 15.3027 16 11.9931 16 8Z"
                fill="#1877F2"
              />

              <path
                d="M11.1141 10.3125L11.4688 8H9.25V6.49937C9.25 5.86662 9.55994 5.25 10.5538 5.25H11.5625V3.28125C11.5625 3.28125 10.647 3.125 9.77169 3.125C7.94438 3.125 6.75 4.2325 6.75 6.2375V8H4.71875V10.3125H6.75V15.9028C7.16351 15.9676 7.58144 16.0001 8 16C8.41856 16.0001 8.83649 15.9676 9.25 15.9028V10.3125H11.1141Z"
                fill="white"
              />
            </g>

            <defs>
              <clipPath id="clip0_13_151">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span>Facebook</span>
        </button>
      </div>

      {/* 5. Footer */}
      <div className="text-center">
        <p className="font-['Inter'] text-[14px] font-medium leading-[20px] text-[#CBD5E1]">
          Already have an account?{" "}
          <Link
            href={loginHref}
            className="ml-1 font-['Inter'] text-[14px] font-medium leading-[20px] text-[#D4AF37] transition-colors hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}