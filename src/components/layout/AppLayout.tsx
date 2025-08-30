// src/components/layout/AppLayout.tsx
"use client";

import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { Header } from '@/components/layout/Header';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        {/* 
          The Sidebar component from shadcn/ui is used here.
          It automatically handles responsiveness:
          - On desktop, it can be collapsed to icon-only if `collapsible="icon"` is set.
          - On mobile, it renders as a Sheet.
          The `SidebarTrigger` in the `Header` component will toggle this behavior.
        */}
        <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r shadow-md">
          <SidebarNav />
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-secondary/30">
            <div className="container mx-auto">
             {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
