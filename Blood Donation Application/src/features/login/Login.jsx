import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Register from '../registration/Register';

// ==========================================
// 1. MOBILE HEADER COMPONENT
// ==========================================
const MobileHeader = () => (
  <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-5 lg:hidden">
    <button className="text-gray-600 transition-colors hover:text-gray-900">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
    </button>
    <h1 className="text-base font-bold text-gray-900">Login</h1>
    <span className="text-sm font-extrabold text-[#D32F2F]">VitalPulse</span>
  </div>
);

// ==========================================
// 2. DESKTOP HERO (LEFT SIDE) COMPONENT
// ==========================================
const DesktopHero = () => (
  <div className="relative hidden w-1/2 flex-col justify-end overflow-hidden bg-gray-900 p-12 lg:flex">
    {/* Background Image - Using a medical/warm placeholder */}
    <img
      src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      alt="Medical background"
      className="absolute inset-0 h-full w-full object-cover opacity-80"
    />
    {/* Red Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000] via-[#8B0000]/60 to-transparent"></div>

    {/* Hero Content */}
    <div className="relative z-10">
      <span className="mb-6 inline-block rounded-full bg-white/20 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-sm">
        Donor Portal
      </span>
      <h1 className="mb-4 text-4xl leading-tight font-extrabold text-white lg:text-5xl">
        Welcome Back,
        <br />
        Life-Saver.
      </h1>
      <p className="max-w-sm text-sm leading-relaxed text-white/80">
        Your commitment fuels the pulse of our community. Sign in to track your
        impact and schedule your next vital contribution.
      </p>
    </div>
  </div>
);

// ==========================================
// 3. MOBILE WELCOME SECTION
// ==========================================
const MobileWelcome = () => (
  <div className="mt-6 mb-8 flex flex-col items-center px-6 text-center lg:hidden">
    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-100 bg-red-50 shadow-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8 text-[#D32F2F]"
      >
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        <path
          fillRule="evenodd"
          d="M12 7a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 0112 7z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <h2 className="mb-2 text-2xl font-extrabold text-gray-900">Welcome Back</h2>
    <p className="text-sm text-gray-500">
      Log in to continue your life-saving journey.
    </p>
  </div>
);

// ==========================================
// 4. FORM COMPONENT
// ==========================================
const LoginForm = ({ email, setEmail, password, setPassword, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-[400px] rounded-[32px] border border-gray-50 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:mx-0 lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none"
    >
      {/* Desktop Only Title */}
      <div className="mb-8 hidden lg:block">
        <h2 className="mb-2 text-3xl font-extrabold text-gray-900">Sign In</h2>
        <p className="text-sm text-gray-500">
          Enter your details to access your dashboard.
        </p>
      </div>

      {/* Email Input */}
      <div className="mb-5">
        <label className="mb-2 block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H3zm14 2.25l-6.5 4.5a.75.75 0 01-.864 0L3 6.25v-.5l6.5 4.5a2.25 2.25 0 002.5 0l6.5-4.5v.5z" />
            </svg>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full rounded-2xl border-none bg-[#F4F4F5] py-4 pr-4 pl-12 text-sm text-gray-900 transition-all outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
            Password
          </label>
          <a
            href="#"
            className="text-[11px] font-bold text-[#006064] hover:text-teal-800"
          >
            Forgot Password?
          </a>
        </div>
        <div className="relative">
          <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-2xl border-none bg-[#F4F4F5] py-4 pr-12 pl-12 text-sm tracking-widest text-gray-900 transition-all outline-none placeholder:tracking-normal focus:ring-2 focus:ring-[#D32F2F]/20"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <path
                fillRule="evenodd"
                d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Keep me logged in (Desktop Only to match screenshot) */}
      <div className="mb-6 hidden items-center gap-3 lg:flex">
        <input
          type="checkbox"
          id="remember"
          className="h-4 w-4 cursor-pointer rounded border-gray-300 text-[#D32F2F] focus:ring-[#D32F2F]"
        />
        <label
          htmlFor="remember"
          className="cursor-pointer text-xs font-medium text-gray-600"
        >
          Keep me logged in
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mb-6 w-full rounded-2xl bg-[#D32F2F] py-4 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition-colors hover:bg-red-800"
      >
        <span className="lg:hidden">Login</span>
        <span className="hidden lg:inline">Login to Portal</span>
      </button>

      {/* Divider */}
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative bg-white px-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          Or continue with
        </div>
      </div>

      {/* Social Logins */}
      <div className="flex flex-col gap-3 lg:flex-row">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-[#F4F4F5] py-3.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-200"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="lg:hidden">Login with Google</span>
          <span className="hidden lg:inline">Google</span>
        </button>
        {/* Apple Button (Desktop Only matching screenshot) */}
        <button
          type="button"
          className="hidden flex-1 items-center justify-center gap-3 rounded-2xl bg-[#F4F4F5] py-3.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-200 lg:flex"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.59.81 3.24.81.65 0 2.06-.9 3.65-.77 1.48.11 2.84.88 3.61 2.11-3.05 1.76-2.58 6.04.38 7.21-.69 1.63-1.57 3.3-2.88 3.61zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.37-2.14 4.35-3.74 4.25z" />
          </svg>
          Apple
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="mt-8 text-center text-sm text-gray-500">
        <span className="lg:hidden">Don't have an account? </span>
        <span className="hidden lg:inline">First time donating? </span>
        <a
          href="#"
          className="font-bold text-[#D32F2F] transition-colors hover:text-red-800"
        >
          <span className="lg:hidden">Sign Up</span>
          <Link to="/registration">
            <span className="hidden lg:inline">Create an account</span>
          </Link>
        </a>
      </p>
    </form>
  );
};

// ==========================================
// 5. MOBILE FOOTER
// ==========================================
const MobileFooter = () => (
  <div className="px-6 pt-10 pb-8 text-center lg:hidden">
    <h3 className="mb-3 font-extrabold text-[#D32F2F]">VitalPulse</h3>
    <p className="mb-4 text-xs text-gray-500">
      © 2024 VitalPulse. Every drop counts.
    </p>
    <div className="flex justify-center gap-6 text-xs font-bold text-gray-400">
      <a href="#" className="hover:text-gray-600">
        Privacy Policy
      </a>
      <a href="#" className="hover:text-gray-600">
        Terms
      </a>
    </div>
  </div>
);

// ==========================================
// 6. PARENT COMPONENT
// ==========================================
export default function LoginPage() {
  // State for the form, ready to connect to your real API
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Connect to Real API here
    console.log('Submitting login for:', email);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9FA] font-sans lg:items-center lg:justify-center">
      {/* Mobile Top Nav */}
      <MobileHeader />

      {/* Main Content Container (Becomes Card on Desktop) */}
      <div className="mx-auto flex w-full max-w-[1000px] flex-1 flex-col overflow-hidden bg-[#F8F9FA] lg:my-10 lg:flex-row lg:rounded-[40px] lg:bg-white lg:shadow-2xl">
        {/* Left Side: Image Hero (Desktop Only) */}
        <DesktopHero />

        {/* Right Side: Form Content */}
        <div className="flex flex-1 flex-col p-4 lg:justify-center lg:p-14">
          <MobileWelcome />

          {/* Main Form Component Instance */}
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleLogin}
          />

          <MobileFooter />
        </div>
      </div>
    </div>
  );
}
