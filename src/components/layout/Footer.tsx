import React from 'react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 md:px-8 md:py-0">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with ❤️ by the ProductStore Team
        </p>
      </div>
    </footer>
  );
}
