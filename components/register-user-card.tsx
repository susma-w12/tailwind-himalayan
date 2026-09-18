"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
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
    fullName: string;
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
  const [fullName, setFullName] = useState("");
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
      onRegister({ fullName, email, username, password });
    }
  };

  return (
    <div
      className={`w-full max-w-[500px] rounded-[32px] bg-[#505561] p-7 sm:p-9 shadow-2xl text-white ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="font-serif text-3xl sm:text-[34px] font-semibold tracking-tight text-white mb-1.5">
          Become Explorer
        </h1>
        <p className="text-sm text-gray-300/90 font-normal">
          Create an Account
        </p>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center mb-5">
        <div className="w-full border-t border-gray-400/30" />
        <span className="absolute bg-[#505561] px-3 text-[10px] sm:text-[11px] font-semibold tracking-wider text-gray-300 uppercase">
          OR SIGN UP WITH
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Full Name */}
        <div className="relative flex items-center">
          <span className="absolute left-4 text-gray-300 pointer-events-none">
            <User className="w-5 h-5" />
          </span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full h-12 sm:h-13 rounded-xl bg-[#5c616e] pl-12 pr-4 text-white placeholder-gray-300/70 text-sm focus:outline-none focus:ring-2 focus:ring-[#d8a32b] transition-all border border-white/10"
          />
        </div>

        {/* Email Address */}
        <div className="relative flex items-center">
          <span className="absolute left-4 text-gray-300 pointer-events-none">
            <Mail className="w-5 h-5" />
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full h-12 sm:h-13 rounded-xl bg-[#5c616e] pl-12 pr-4 text-white placeholder-gray-300/70 text-sm focus:outline-none focus:ring-2 focus:ring-[#d8a32b] transition-all border border-white/10"
          />
        </div>

        {/* Username */}
        <div className="relative flex items-center">
          <span className="absolute left-4 text-gray-300 pointer-events-none">
            <AtSign className="w-5 h-5" />
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full h-12 sm:h-13 rounded-xl bg-[#5c616e] pl-12 pr-4 text-white placeholder-gray-300/70 text-sm focus:outline-none focus:ring-2 focus:ring-[#d8a32b] transition-all border border-white/10"
          />
        </div>

        {/* Password */}
        <div className="relative flex items-center">
          <span className="absolute left-4 text-gray-300 pointer-events-none">
            <Lock className="w-5 h-5" />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full h-12 sm:h-13 rounded-xl bg-[#5c616e] pl-12 pr-12 text-white placeholder-gray-300/70 text-sm focus:outline-none focus:ring-2 focus:ring-[#d8a32b] transition-all border border-white/10"
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

        {/* Confirm Password */}
        <div className="relative flex items-center">
          <span className="absolute left-4 text-gray-300 pointer-events-none">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="w-full h-12 sm:h-13 rounded-xl bg-[#5c616e] pl-12 pr-12 text-white placeholder-gray-300/70 text-sm focus:outline-none focus:ring-2 focus:ring-[#d8a32b] transition-all border border-white/10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-4 text-gray-300 hover:text-white transition-colors focus:outline-none cursor-pointer"
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
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
            className="w-4 h-4 rounded border-gray-400 bg-[#5c616e] text-[#d8a32b] focus:ring-[#d8a32b] cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs text-gray-300 leading-snug cursor-pointer select-none">
            I agree to the{" "}
            <Link
              href={termsHref}
              className="text-[#e5a93c] underline hover:text-[#f5be57] transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href={privacyHref}
              className="text-[#e5a93c] underline hover:text-[#f5be57] transition-colors"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        {error && (
          <p className="text-xs text-red-400 font-medium">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-12 sm:h-13 rounded-xl bg-[#d8a32b] hover:bg-[#c69324] text-stone-900 font-semibold text-base flex items-center justify-center gap-2 shadow-[0_6px_22px_rgba(216,163,43,0.35)] active:scale-[0.99] transition-all cursor-pointer mt-2"
        >
          <span>Create Account</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Social Buttons */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          {/* Google */}
          <button
            type="button"
            className="h-11 sm:h-12 flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-xs sm:text-sm font-medium cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
            className="h-11 sm:h-12 flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-xs sm:text-sm font-medium cursor-pointer"
          >
            <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-1 .04-2.16.66-2.84 1.46-.59.69-1.11 1.83-.97 2.93 1.11.08 2.16-.55 2.82-1.35z" />
            </svg>
            <span>Apple</span>
          </button>

          {/* Facebook */}
          <button
            type="button"
            className="h-11 sm:h-12 flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-xs sm:text-sm font-medium cursor-pointer"
          >
            <svg className="w-4 h-4 fill-[#1877F2] shrink-0" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook</span>
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-xs sm:text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            href={loginHref}
            className="text-[#e5a93c] font-medium hover:underline transition-colors ml-1"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
