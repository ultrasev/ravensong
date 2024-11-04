"use client";

import { login } from "./actions";
export const runtime = "edge";
import { h } from "@/lib/i18n-config";
import { dictionary } from "@/lib/dictionaries/auth/login";
import { useLanguage } from "@/components/LanguageContext";

export default function LoginPage() {
  const { currentLanguage: l } = useLanguage();
  return (
    <div className="flex-grow flex justify-center items-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
          {h(l, dictionary.welcome)}
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400">
          {h(l, dictionary.signIn)}
        </p>

        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                {h(l, dictionary.email)}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                placeholder={h(l, dictionary.email)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {h(l, dictionary.password)}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                placeholder={h(l, dictionary.password)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                {h(l, dictionary.rememberMe)}
              </label>
            </div>
            <div className="ml-2 text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {h(l, dictionary.forgotPassword)}
              </a>
            </div>
          </div>

          <button
            formAction={login}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            {h(l, dictionary.signInButton)}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          <a
            href="/auth/register"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {h(l, dictionary.signUp)}
          </a>
        </p>
      </div>
    </div>
  );
}
