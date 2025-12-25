// AppShell - main layout wrapper

import { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { cn } from '../../utils';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--color-surface-primary)]">
      <Sidebar />
      <main
        className={cn(
          'ml-[var(--sidebar-width)]',
          'min-h-screen',
          'transition-all duration-300'
        )}
      >
        {children}
      </main>
    </div>
  );
}
