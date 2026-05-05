import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Tag, 
  Package, 
  Users, 
  ShoppingCart 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Categories', href: '/categories', icon: Tag },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-card hidden md:block">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
