"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { SiteConfigs } from "@/app/configs";
import Link from "next/link";
import { h } from "@/lib/i18n-config";
import { dictionary } from "@/lib/dictionaries/auth/register";
import { useLanguage } from "@/components/LanguageContext";

export const runtime = 'edge';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { currentLanguage: l } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: SiteConfigs.redirectTo,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/auth/check-email");
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transition-all duration-300">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {h(l, dictionary.createAccount)}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {h(l, dictionary.signUpMessage)}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700 transition-colors duration-200"
                placeholder={h(l, dictionary.email)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700 transition-colors duration-200"
                placeholder={h(l, dictionary.password)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105"
            >
              {h(l, dictionary.signUpButton)}
            </button>
          </div>
        </form>
        {error && (
          <p className="mt-2 text-center text-sm text-red-600 dark:text-red-400 animate-pulse">
            {error}
          </p>
        )}
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {h(l, dictionary.alreadyHaveAccount)}{" "}
          <Link
            href="/auth/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
          >
            {h(l, dictionary.signIn)}
          </Link>
        </p>
      </div>
    </div>
  );
}
