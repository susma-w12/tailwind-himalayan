"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowRight, AtSign } from "lucide-react";

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
      className={`w-full max-w-[520px] rounded-[28px] bg-[#7e8287] p-8 sm:p-10 shadow-2xl text-white ${className}`}
    >
      {/* Top Header */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl sm:text-[34px] font-medium tracking-tight text-white mb-2">
          Welcome Explorer
        </h1>
        <p className="text-sm text-gray-200/90 font-normal">Login here</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email or Username */}
        <div className="space-y-2">
          <label
            htmlFor="emailOrUsername"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-200"
          >
            EMAIL OR USERNAME
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-gray-300 pointer-events-none">
              <AtSign className="w-5 h-5" />
            </span>
            <input
              id="emailOrUsername"
              name="emailOrUsername"
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="himalayantrail@gmail.com"
              required
              className="w-full h-14 rounded-xl bg-[#54575d] pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d8a32b] transition-all border border-white/5"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-200"
            >
              PASSWORD
            </label>
            <Link
              href={forgotPasswordHref}
              className="text-xs font-medium text-[#e5a93c] hover:underline transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-gray-300 pointer-events-none">
              <Lock className="w-5 h-5" />
            </span>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full h-14 rounded-xl bg-[#54575d] pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d8a32b] transition-all border border-white/5"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 text-gray-300 hover:text-white transition-colors focus:outline-none cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Log In Button */}
        <button
          type="submit"
          className="w-full h-14 rounded-xl bg-[#d8a32b] hover:bg-[#c69324] text-stone-900 font-semibold text-base flex items-center justify-center gap-2 shadow-[0_6px_22px_rgba(216,163,43,0.35)] active:scale-[0.99] transition-all cursor-pointer"
        >
          <span>Log In</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        

        {/* Divider */}
        <div className="relative flex items-center justify-center py-2">
          <div className="w-full border-t border-gray-400/40" />
          <span className="absolute bg-[#7e8287] px-3 text-[11px] font-semibold tracking-wider text-gray-200 uppercase">
            OR CONTINUE WITH
          </span>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-3 gap-3.5">
          {/* Google */}
          <button
            type="button"
            aria-label="Continue with Google"
            className="h-12 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.315 0-6-2.685-6-6s2.685-6 6-6c1.489 0 2.85.545 3.9 1.45l2.4-2.4C17.065 3.655 14.82 3 12.24 3 7.275 3 3.24 7.035 3.24 12s4.035 9 9 9c5.205 0 8.655-3.66 8.655-8.82 0-.585-.06-1.17-.18-1.895h-8.475z" />
            </svg>
          </button>

          {/* Apple */}
          <button
            type="button"
            aria-label="Continue with Apple"
            className="h-12 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-1 .04-2.16.66-2.84 1.46-.59.69-1.11 1.83-.97 2.93 1.11.08 2.16-.55 2.82-1.35z" />
            </svg>
          </button>

          {/* Facebook */}
          <button
            type="button"
            aria-label="Continue with Facebook"
            className="h-12 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
