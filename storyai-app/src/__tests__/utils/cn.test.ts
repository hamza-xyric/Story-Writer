// Tests for cn (class names) utility
import { describe, it, expect } from 'vitest';
import { cn } from '../../utils/cn';

describe('cn', () => {
  it('merges class names', () => {
    const result = cn('px-4', 'py-2');
    expect(result).toBe('px-4 py-2');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base', isActive && 'active');
    expect(result).toBe('base active');
  });

  it('filters out falsy values', () => {
    const result = cn('base', false, null, undefined, 'valid');
    expect(result).toBe('base valid');
  });

  it('merges conflicting Tailwind classes (last wins)', () => {
    const result = cn('px-4', 'px-8');
    expect(result).toBe('px-8');
  });

  it('handles arrays of classes', () => {
    const result = cn(['px-4', 'py-2'], 'text-base');
    expect(result).toBe('px-4 py-2 text-base');
  });

  it('handles objects with boolean values', () => {
    const result = cn({
      'bg-red': true,
      'bg-blue': false,
      'text-white': true,
    });
    expect(result).toBe('bg-red text-white');
  });

  it('correctly merges Tailwind color variants', () => {
    const result = cn('bg-red-500', 'bg-blue-500');
    expect(result).toBe('bg-blue-500');
  });

  it('handles empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles complex nested arrays and objects', () => {
    const isDisabled = false;
    const variant = 'primary';
    const result = cn(
      'base-class',
      ['flex', 'items-center'],
      {
        'cursor-not-allowed': isDisabled,
        'cursor-pointer': !isDisabled,
      },
      variant === 'primary' && 'bg-blue-500',
    );
    expect(result).toContain('base-class');
    expect(result).toContain('flex');
    expect(result).toContain('cursor-pointer');
    expect(result).toContain('bg-blue-500');
    expect(result).not.toContain('cursor-not-allowed');
  });
});
