// Input component - warm, accessible

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, error, fullWidth, ...props }, ref) => {
    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            // Base styles
            'w-full px-3 py-2',
            'text-[var(--color-text-primary)]',
            'bg-[var(--color-surface-elevated)]',
            'border border-[var(--color-border-default)]',
            'rounded-lg',
            'placeholder:text-[var(--color-text-muted)]',
            'transition-all duration-200',

            // Focus styles
            'focus:outline-none',
            'focus:border-[var(--color-accent-terracotta)]',
            'focus:ring-2 focus:ring-[var(--color-accent-terracotta)]/20',

            // Error styles
            error && [
              'border-[var(--color-error)]',
              'focus:border-[var(--color-error)]',
              'focus:ring-[var(--color-error)]/20',
            ],

            // Icon padding
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',

            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
