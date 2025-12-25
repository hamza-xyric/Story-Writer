// Card component - warm paper-like aesthetic

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'asymmetric';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  selected?: boolean;
  children: ReactNode;
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      interactive = false,
      selected = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-lg transition-all duration-200',
          paddingClasses[padding],

          // Variant styles
          variant === 'default' && [
            'bg-[var(--color-surface-elevated)]',
            'shadow-[var(--shadow-sm)]',
          ],
          variant === 'elevated' && [
            'bg-[var(--color-surface-elevated)]',
            'shadow-[var(--shadow-md)]',
          ],
          variant === 'outlined' && [
            'bg-[var(--color-surface-elevated)]',
            'border border-[var(--color-border-default)]',
          ],
          variant === 'asymmetric' && [
            'bg-[var(--color-surface-elevated)]',
            'shadow-[var(--shadow-sm)]',
            'border-l-3 border-l-[var(--color-accent-terracotta)]',
            'rounded-tl-sm rounded-bl-md rounded-tr-lg rounded-br-sm',
          ],

          // Interactive styles
          interactive && [
            'cursor-pointer',
            'hover:shadow-[var(--shadow-md)]',
            'hover:-translate-y-0.5',
            'active:translate-y-0',
            'active:shadow-[var(--shadow-sm)]',
          ],

          // Selected state
          selected && [
            'ring-2 ring-[var(--color-accent-terracotta)]',
            'ring-offset-2 ring-offset-[var(--color-surface-primary)]',
          ],

          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
