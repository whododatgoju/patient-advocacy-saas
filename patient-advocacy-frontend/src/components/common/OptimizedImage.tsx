import React, { useState, useEffect, useRef, memo } from 'react';
import styles from './OptimizedImage.module.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  placeholderColor?: string;
  lazyLoad?: boolean;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

// Add fetchPriority to HTMLImageElement
declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}

/**
 * OptimizedImage component that implements lazy loading, responsive loading,
 * and prevents layout shifts with proper placeholders
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholderColor = '#f0f0f0',
  lazyLoad = true,
  priority = false,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle image load success
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Handle image load error
  const handleError = () => {
    setIsError(true);
    if (onError) onError();
  };

  // Set up intersection observer for lazy loading
  useEffect(() => {
    // Skip lazy loading if the priority is set or if lazyLoad is disabled
    if (priority || !lazyLoad) {
      return;
    }

    if (imgRef.current && 'IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && imgRef.current) {
              // Load the image when it enters the viewport
              imgRef.current.src = src;
              // Disconnect observer after loading
              observerRef.current?.disconnect();
              observerRef.current = null;
            }
          });
        },
        {
          rootMargin: '200px 0px', // Start loading image when it's 200px from viewport
          threshold: 0.01,
        }
      );

      observerRef.current.observe(imgRef.current);
    } else {
      // Fallback for browsers that don't support Intersection Observer
      if (imgRef.current) {
        imgRef.current.src = src;
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, priority, lazyLoad]);

  // Define placeholder style
  const placeholderStyle = {
    backgroundColor: placeholderColor,
    width: width || '100%',
    height: height || 'auto',
    aspectRatio: width && height ? undefined : '16/9',
  };

  return (
    <div
      className={`${styles.imageContainer} ${className}`}
      style={{ width: width || '100%', height: height || 'auto' }}
    >
      {/* Show placeholder while loading */}
      {!isLoaded && !isError && (
        <div className={styles.placeholder} style={placeholderStyle}>
          <div className={styles.loadingShimmer}></div>
        </div>
      )}

      {/* Show error state if image failed to load */}
      {isError && (
        <div className={styles.errorContainer} style={placeholderStyle}>
          <span className={styles.errorIcon}>!</span>
          <span className={styles.errorText}>Failed to load image</span>
        </div>
      )}

      {/* Image element */}
      <img
        ref={imgRef}
        src={priority || !lazyLoad ? src : ''}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={`${styles.image} ${isLoaded ? styles.visible : styles.hidden}`}
        loading={lazyLoad && !priority ? 'lazy' : undefined}
        decoding="async"
        // Additional performance attributes
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </div>
  );
};

export default memo(OptimizedImage);
