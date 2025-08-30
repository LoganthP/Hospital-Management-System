// src/components/layout/SidebarNav.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  LayoutDashboard,
  UserSearch,
  UsersRound,
  BriefcaseMedical,
  CalendarDays,
  FileText,
  BrainCircuit,
  CreditCard,
  BookOpenText,
  PanelLeft
} from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/Logo';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  matchExact?: boolean;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: HomeIcon, matchExact: true },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/specialist-finder', label: 'Specialist Finder', icon: UserSearch },
  { href: '/ai-prescriptions', label: 'AI Prescriptions', icon: BrainCircuit },
  { href: '/patient-data', label: 'Patient Data', icon: UsersRound },
  { href: '/doctor-data', label: 'Doctor Data', icon: BriefcaseMedical },
  { href: '/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/medical-records', label: 'Medical Records', icon: FileText },
  { href: '/billing', label: 'Billing', icon: CreditCard },
  { href: '/hospital-guide', label: 'Hospital Guide', icon: BookOpenText },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="flex h-16 items-center justify-between border-b p-3 md:p-4">
        <Link href="/" className="flex items-center gap-2.5 whitespace-nowrap">
          <Logo className="h-8 w-8 shrink-0 text-primary" />
          <span className="text-xl font-bold text-foreground group-data-[collapsible=icon]:hidden">
            Lonmedi Healthhub
          </span>
        </Link>
        <SidebarTrigger className="hidden md:flex" asChild>
            <button> {/* Using button directly because asChild with Button component was problematic with shadcn sidebar structure */}
                <PanelLeft className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                <span className="sr-only">Toggle Sidebar</span>
            </button>
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto py-2">
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = item.matchExact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={isActive}
                    className={cn(
                      "justify-start w-full",
                      isActive && "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary",
                      !isActive && "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                    tooltip={{ children: item.label, side: 'right', align: 'center', className: "group-data-[collapsible=icon]:block hidden" }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
