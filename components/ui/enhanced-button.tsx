'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { ButtonLoader } from '@/components/ui/loading';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  haptic?: boolean;
  ripple?: boolean;
}

export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ children, loading, loadingText, haptic = true, ripple = true, disabled, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;
      
      // Haptic feedback for mobile devices
      if (haptic && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }
      
      onClick?.(e);
    };

    return (
      <motion.div
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          ref={ref}
          disabled={disabled || loading}
          onClick={handleClick}
          {...props}
        >
          {loading ? (
            <>
              <ButtonLoader />
              {loadingText || 'Loading...'}
            </>
          ) : (
            children
          )}
        </Button>
      </motion.div>
    );
  }
);

EnhancedButton.displayName = 'EnhancedButton';