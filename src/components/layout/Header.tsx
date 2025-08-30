// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Menu } from 'lucide-react'; // Using Menu for SidebarTrigger
import { Logo } from '@/components/icons/Logo';

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 shadow-sm backdrop-blur-md md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>
        </SidebarTrigger>
        {/* Desktop: Show logo and title if sidebar is collapsed. Mobile: show logo and title */}
         <Link href="/" className="flex items-center gap-2 md:hidden group-data-[state=collapsed]/sidebar-wrapper:flex">
          <Logo className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">
            Lonmedi Healthhub central
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {/* Future user menu can go here */}
        {/* Example: <UserNav /> */}
      </div>
    </header>
  );
}
