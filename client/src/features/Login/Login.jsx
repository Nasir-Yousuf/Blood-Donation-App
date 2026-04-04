import React, { useState } from 'react';
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  redirect,
} from 'react-router-dom';
import api from '../../api/axiosInstance'; // FIXED TYPO: axious -> axios
import { store } from '../../store/index';
import { setCredentials } from '../../store/slices/authSlice';

// ==========================================
// 1. THE LOGIN ACTION (React Router uses this!)
// ==========================================
export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    const response = await api.post('/users/login', credentials);

    const token = response.data.token;
    const user = response.data.data.user;

    localStorage.setItem('jwt_token', token);
    store.dispatch(setCredentials({ user, token }));

    return redirect('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
    return (
      error.response?.data?.message ||
      'Invalid email or password. Please try again.'
    );
  }
};

// ==========================================
// 2. DESKTOP HERO COMPONENT
// ==========================================
const DesktopHero = () => (
  <div className="relative hidden w-1/2 flex-col justify-end overflow-hidden bg-gray-900 p-12 lg:flex">
    <img
      src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      alt="Medical background"
      className="absolute inset-0 h-full w-full object-cover opacity-80"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000] via-[#8B0000]/60 to-transparent"></div>
    <div className="relative z-10">
      <span className="mb-6 inline-block rounded-full bg-white/20 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-sm">
        Donor Portal
      </span>
      <h1 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-white lg:text-5xl">
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
// 3. MAIN LOGIN COMPONENT
// ==========================================
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const errorMessage = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9FA] font-sans lg:items-center lg:justify-center">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5 shadow-sm lg:hidden">
        <Link
          to="/"
          className="text-gray-600 transition-colors hover:text-gray-900"
        >
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
        </Link>
        <h1 className="text-base font-bold text-gray-900">Login</h1>
        <span className="text-sm font-extrabold text-[#D32F2F]">
          Clinical Vitality
        </span>
      </div>

      <div className="mx-auto flex w-full max-w-[1000px] flex-1 flex-col overflow-hidden bg-[#F8F9FA] lg:my-10 lg:flex-row lg:rounded-[40px] lg:bg-white lg:shadow-2xl">
        <DesktopHero />

        <div className="flex flex-1 flex-col p-6 lg:justify-center lg:p-14">
          <div className="mt-4 mb-8 flex flex-col items-center text-center lg:hidden">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-100 bg-red-50 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7 text-[#D32F2F]"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <h2 className="mb-1 text-2xl font-extrabold text-gray-900">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500">
              Log in to continue your journey.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[400px] rounded-[32px] border border-gray-50 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:mx-0 lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none">
            <div className="mb-8 hidden lg:block">
              <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900">
                Sign In
              </h2>
              <p className="text-sm text-gray-500">
                Enter your details to access your dashboard.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm font-medium text-red-600">
                {errorMessage}
              </div>
            )}

            <Form method="post">
              <div className="mb-5">
                <label className="mb-2 block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className="w-full rounded-2xl border-none bg-[#F4F4F5] py-4 pr-4 pl-12 text-sm text-gray-900 transition-all outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                    required
                  />
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
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-[11px] font-bold text-[#006064] transition-colors hover:text-teal-800"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    className="w-full rounded-2xl border-none bg-[#F4F4F5] py-4 pr-12 pl-12 text-sm tracking-widest text-gray-900 transition-all outline-none placeholder:tracking-normal focus:ring-2 focus:ring-[#D32F2F]/20"
                    required
                  />
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
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 outline-none hover:text-gray-600"
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D32F2F] py-4 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition-colors hover:bg-red-800 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    <span className="lg:hidden">Login</span>
                    <span className="hidden lg:inline">Login to Portal</span>
                  </>
                )}
              </button>
            </Form>

            <div className="relative mb-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative bg-white px-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase lg:bg-[#F8F9FA]">
                Or continue with
              </div>
            </div>

            <div className="mb-8 flex flex-col gap-3 lg:flex-row">
              <button
                type="button"
                onClick={() => alert('Google Login coming soon!')}
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
              <button
                type="button"
                onClick={() => alert('Apple Login coming soon!')}
                className="hidden flex-1 items-center justify-center gap-3 rounded-2xl bg-[#F4F4F5] py-3.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-200 lg:flex"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.59.81 3.24.81.65 0 2.06-.9 3.65-.77 1.48.11 2.84.88 3.61 2.11-3.05 1.76-2.58 6.04.38 7.21-.69 1.63-1.57 3.3-2.88 3.61zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.37-2.14 4.35-3.74 4.25z" />
                </svg>
                Apple
              </button>
            </div>

            <div className="border-t border-gray-100 pt-6 text-center">
              <p className="text-sm font-medium text-gray-600">
                First time donating?{' '}
                <Link
                  to="/registration"
                  className="rounded-sm px-1 font-bold text-[#D32F2F] transition-colors outline-none hover:text-[#B71C1C] hover:underline focus:ring-2 focus:ring-[#D32F2F]"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
