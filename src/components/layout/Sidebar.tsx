'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Tag,
  Package,
  Users,
  ShoppingCart,
  Building2,
  Handshake,
  Link2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Categories', href: '/categories', icon: Tag },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Tenants', href: '/tenants', icon: Building2 },
  { name: 'Partners', href: '/partners', icon: Handshake },
  { name: 'Partner Products', href: '/partner-products', icon: Link2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-zinc-900 hidden md:block">
      <div className="flex h-full flex-col border-r border-zinc-700">
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-0.5 px-2">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white text-zinc-900'
                      : 'text-zinc-300 hover:bg-zinc-700 hover:text-white',
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
