"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { HeaderBase } from "./header-base";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const leftContent = (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="relative">
        <Image
          src="/vlogcut-logo.png"
          alt="VLOGCUT"
          width={32}
          height={32}
          className="w-8 h-8 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(45,67%,52%,0.5)]"
        />
      </div>
      <span className="text-xl font-bold tracking-tight hidden md:block">
        <span className="text-foreground">VLOG</span>
        <span className="text-primary">CUT</span>
      </span>
    </Link>
  );

  const rightContent = (
    <nav className="flex items-center gap-2">
      <Link href="/projects">
        <Button variant="primary" size="sm" className="text-sm ml-2">
          Launch Editor
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
      <ThemeToggle className="mr-1" />
    </nav>
  );

  return (
    <div className="sticky top-4 z-50 mx-4 md:mx-0">
      <HeaderBase
        className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl max-w-3xl mx-auto mt-4 pl-4 pr-[11px] shadow-lg shadow-primary/5"
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </div>
  );
}
