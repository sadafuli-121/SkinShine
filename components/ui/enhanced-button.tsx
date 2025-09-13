'use client';

import { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  haptic?: boolean;
}

export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ children, loading, loadingText, haptic = true, disabled, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;
      
      // Haptic feedback for mobile devices
      if (haptic && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }
      
      onClick?.(e);
    };

    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {loadingText || 'Loading...'}
          </>
        ) : (
          children
        )}
      </Button>
    );
  }
);

EnhancedButton.displayName = 'EnhancedButton';