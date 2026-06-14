import { User } from 'lucide-react';
import * as React from 'react';

import { cn, getColorClass } from '@/shared/lib/utils';

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  alt: string;
  fallback?: string;
  fullName?: string | null;
  /** Optional width/height for fallback placeholder */
  width?: number | string;
  height?: number | string;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, fallback, fullName, className, width, height, ...props }, ref) => {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const isInvalidSrc = !src || (typeof src === 'string' && src.trim() === '');

    // Generate initials
    const displayName = fullName || alt || '';
    const initials = displayName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const handleError = () => {
      setError(true);
      setLoading(false);
    };

    const handleLoad = () => {
      setLoading(false);
    };

    // Fallback image
    if ((error || isInvalidSrc) && fallback) {
      return (
        <img
          ref={ref}
          src={fallback}
          alt={alt}
          className={cn('object-cover', className)}
          onError={handleError}
          onLoad={handleLoad}
          width={width}
          height={height}
          {...props}
        />
      );
    }

    // Initials / User icon placeholder
    if ((error || isInvalidSrc) && !fallback) {
      const colorClass = initials ? getColorClass(displayName) : 'bg-gray-600 text-white';

      return (
        <div
          className={cn(
            'flex items-center justify-center transition-all duration-300 @container',
            colorClass,
            className
          )}
          style={{
            width: width ?? '100%',
            height: height ?? '100%',
          }}
        >
          {initials ? (
            <span className="uppercase font-bold" style={{ fontSize: '40cqw' }}>
              {initials}
            </span>
          ) : (
            <User className="text-xl" />
          )}
        </div>
      );
    }

    // Main image
    return (
      <img
        ref={ref}
        src={src!}
        alt={alt}
        className={cn(
          'object-cover transition-all duration-300 ease-in bg-muted aspect-square border',
          loading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onError={handleError}
        onLoad={handleLoad}
        width={width}
        height={height}
        {...props}
      />
    );
  }
);

Image.displayName = 'Image';

export const Avatar = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt = 'Avatar', ...props }, ref) => (
    <Image
      ref={ref}
      className={cn('rounded-lg', className)}
      alt={alt}
      {...props}
    />
  )
);

Avatar.displayName = 'Avatar';

export const Logo = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt = 'Logo', ...props }, ref) => (
    <Image
      ref={ref}
      className={cn('object-contain', className)}
      alt={alt}
      {...props}
    />
  )
);

Logo.displayName = 'Logo';
