/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';

interface ThemedIconProps {
  name: string;
  size?: number;
  color?: 'text' | 'primary' | 'secondary' | 'accent' | string;
  variant?: 'Bold' | 'Broken' | 'Bulk' | 'Linear' | 'Outline' | 'TwoTone';
  className?: string;
}

/**
 * Tự động load icon theo tên + đổi màu theo theme.
 */
const ThemedIcon: React.FC<ThemedIconProps> = ({
  name,
  size = 24,
  color = 'text',
  variant = 'Bold',
  className,
}) => {
  const [Icon, setIcon] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    let mounted = true;
    import('iconsax-react')
      .then(mod => {
        if (mounted) {
          const SelectedIcon = (mod as any)[name];
          setIcon(() => SelectedIcon || null);
        }
      })
      .catch(() => setIcon(null));

    return () => {
      mounted = false;
    };
  }, [name]);

  const cssColor =
    ['text', 'primary', 'secondary', 'accent'].includes(color)
      ? `rgb(var(--color-${color}))`
      : color;

  // Hiển thị placeholder khi icon chưa load xong
  if (!Icon) return <span style={{ width: size, height: size }} />;

  return <Icon size={size} color={cssColor} variant={variant} className={className} />;
};

export default ThemedIcon;
