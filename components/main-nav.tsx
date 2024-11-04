import * as React from "react";
import Link from "next/link";
import { NavItem } from "@/types/nav";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { siteConfig } from "@/config/site";

export interface MainNavProps {
  items?: NavItem[];
  lang: string;
}

const getRef = (item: NavItem) => {
  const lang = localStorage.getItem("locale") || "en";
  return item.multiLang ? `/${lang}${item.href}` : item.href || "/";
};

const localText = (lang: string): { [key: string]: string } => {
  switch (lang) {
    case "zh":
      return {
        homepage: "首页",
        fonts: "字体",
        about: "关于",
      };
    default:
      return {
        homepage: "Home",
        fonts: "Fonts",
        about: "About",
      };
  }
};

import { young_serif } from "@/app/ui/Font";
export function MainNav({ items, lang }: MainNavProps) {
  const text = localText(lang);
  console.log("lang in main-nav", lang);
  console.log("text", text);

  return (
    <div className="container flex h-16 items-center justify-between p-4 backdrop-blur-2xl md:p-8 rounded-lg">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold text-xl font-serif">
          <Image
            src="/icons/favicon.ico"
            alt="favicon"
            width={32}
            height={32}
            className="inline-block rounded-full"
          />
        </span>
        <span className="ml-2 text-xl font-bold font-serif group transition-colors duration-300">
          {siteConfig.name}
        </span>
      </Link>

      <nav className="flex items-center space-x-6">
        <Link
          href={`/${lang}/fonts`}
          className="transition-colors hover:text-foreground/80 text-foreground"
        >
          <span
            className={`ml-2 text-xl font-bold ${young_serif.className} group transition-colors duration-300`}
          >
            {text.fonts}
          </span>
        </Link>
        <Link
          href={`/${lang}/about`}
          className="transition-colors hover:text-foreground/80 text-foreground"
        >
          <span
            className={`ml-2 text-xl font-bold ${young_serif.className} group transition-colors duration-300`}
          >
            {text.about}
          </span>
        </Link>
      </nav>
    </div>
  );
}
