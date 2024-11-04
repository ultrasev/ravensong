"use client";
import { MainNav, MainNavProps } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import React, { lazy, Suspense } from "react";
import LocaleSwitcher from "./locale-switcher";
import { useParams } from "next/navigation";
import { useLanguage } from "./LanguageContext";


const Wormhole = () => {
  return (
    <Link href={`/wormhole`} rel="noreferrer" title="打开 Wormhole 链接">
      <span className="ml-4 font-serif font-bold text-lg text-gray-800 dark:text-gray-200  border-gray-800 dark:border-gray-200 hover:border-gray-600 dark:hover:border-gray-400">
        {" "}
        wormhole{" "}
      </span>
    </Link>
  );
};

const Share = () => {
  const params = useParams();
  const lang = params?.lang || "en";
  return (
    <Link
      href={`/${lang}/share`}
      className="ml-4 font-serif font-bold text-lg text-gray-800 dark:text-gray-200  border-gray-800 dark:border-gray-200 hover:border-gray-600 dark:hover:border-gray-400"
    >
      share
    </Link>
  );
};

export function SiteHeader() {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage;

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="container flex h-16 items-center justify-between p-4 backdrop-blur-2xl md:p-8 rounded-lg">
        {/* 左侧 Logo */}
        <MainNav items={siteConfig.mainNav} lang={lang} />

        {/* 右侧导航和工具栏 */}
        <div className="flex items-center space-x-6">
          <ThemeToggle />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
