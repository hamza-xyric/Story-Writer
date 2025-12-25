// Button component - warm, accessible

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      children,
      leftIcon,
      rightIcon,
      loading,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2',
          'font-medium rounded-lg',
          'transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-[var(--color-accent-terracotta)]',
          'focus-visible:ring-offset-2',
          'focus-visible:ring-offset-[var(--color-surface-primary)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',

          // Size variants
          size === 'sm' && 'px-3 py-1.5 text-sm',
          size === 'md' && 'px-4 py-2 text-base',
          size === 'lg' && 'px-6 py-3 text-lg',

          // Color variants
          variant === 'primary' && [
            'bg-[var(--color-accent-terracotta)]',
            'text-white',
            'hover:bg-[var(--color-accent-terracotta-dark)]',
            'active:bg-[var(--color-accent-terracotta-dark)]',
          ],
          variant === 'secondary' && [
            'bg-[var(--color-surface-tertiary)]',
            'text-[var(--color-text-primary)]',
            'hover:bg-[var(--color-border-default)]',
          ],
          variant === 'ghost' && [
            'bg-transparent',
            'text-[var(--color-text-secondary)]',
            'hover:bg-[var(--color-surface-tertiary)]',
            'hover:text-[var(--color-text-primary)]',
          ],
          variant === 'outline' && [
            'bg-transparent',
            'border border-[var(--color-border-default)]',
            'text-[var(--color-text-primary)]',
            'hover:bg-[var(--color-surface-tertiary)]',
            'hover:border-[var(--color-border-strong)]',
          ],

          className
        )}
        {...props}
      >
        {loading ? (
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
