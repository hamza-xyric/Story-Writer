// Tag component - for themes, emotions, categories

import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'theme' | 'emotion' | 'category' | 'outline';
  size?: 'sm' | 'md';
  children: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
}

export function Tag({
  variant = 'default',
  size = 'sm',
  className,
  children,
  removable,
  onRemove,
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        // Base styles
        'inline-flex items-center gap-1',
        'font-medium rounded-full',
        'transition-colors duration-150',

        // Size variants
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-3 py-1 text-sm',

        // Color variants
        variant === 'default' && [
          'bg-[var(--color-surface-tertiary)]',
          'text-[var(--color-text-secondary)]',
        ],
        variant === 'theme' && [
          'bg-[var(--color-accent-slate)]/10',
          'text-[var(--color-accent-slate)]',
        ],
        variant === 'emotion' && [
          'bg-[var(--color-accent-dusty-rose)]/15',
          'text-[var(--color-accent-dusty-rose)]',
        ],
        variant === 'category' && [
          'bg-[var(--color-accent-terracotta)]/10',
          'text-[var(--color-accent-terracotta)]',
        ],
        variant === 'outline' && [
          'bg-transparent',
          'border border-[var(--color-border-default)]',
          'text-[var(--color-text-secondary)]',
        ],

        className
      )}
      {...props}
    >
      {children}
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className={cn(
            'ml-0.5 -mr-0.5 p-0.5 rounded-full',
            'hover:bg-black/10',
            'focus:outline-none focus:ring-1 focus:ring-current'
          )}
          aria-label="Remove"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
