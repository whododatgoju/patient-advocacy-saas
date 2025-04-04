import React, { useRef, useState, memo } from 'react';
import styles from './VirtualizedList.module.css';

interface VirtualizedListProps<T> {
  items: T[];
  height: number;
  itemHeight: number | ((item: T, index: number) => number);
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
}

/**
 * VirtualizedList component for efficiently rendering large lists
 * Only renders items that are visible in the viewport plus overscan
 */
function VirtualizedList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  overscan = 3,
  className = '',
  onScroll,
}: VirtualizedListProps<T>): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  
  // Pre-calculate all item heights if itemHeight is a function
  const itemHeights = React.useMemo(() => {
    return typeof itemHeight === 'function'
      ? items.map((item, index) => itemHeight(item, index))
      : Array(items.length).fill(itemHeight);
  }, [items, itemHeight]);
  
  // Calculate total scroll height
  const totalHeight = React.useMemo(() => {
    return itemHeights.reduce((sum, height) => sum + height, 0);
  }, [itemHeights]);
  
  // Calculate visible item range
  const { startIndex, endIndex, topPadding } = React.useMemo(() => {
    let currentOffset = 0;
    let startIndex = 0;
    
    // Find the first visible item
    for (let i = 0; i < items.length; i++) {
      const itemH = itemHeights[i];
      if (currentOffset + itemH > scrollTop - (overscan * (typeof itemHeight === 'number' ? itemHeight : 50))) {
        startIndex = i;
        break;
      }
      currentOffset += itemH;
    }
    
    // Calculate padding before first visible item
    const topPadding = startIndex > 0 
      ? itemHeights.slice(0, startIndex).reduce((sum, h) => sum + h, 0) 
      : 0;
    
    // Find the last visible item
    let endIndex = startIndex;
    let visibleHeight = 0;
    
    for (let i = startIndex; i < items.length; i++) {
      const itemH = itemHeights[i];
      visibleHeight += itemH;
      
      if (visibleHeight > height + (overscan * (typeof itemHeight === 'number' ? itemHeight : 50))) {
        endIndex = i;
        break;
      }
      
      endIndex = i;
    }
    
    return { startIndex, endIndex, topPadding };
  }, [scrollTop, height, items.length, itemHeights, overscan, itemHeight]);
  
  // Handle scroll event
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const newScrollTop = event.currentTarget.scrollTop;
    setScrollTop(newScrollTop);
    
    if (onScroll) {
      onScroll(event);
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={`${styles.virtualizedContainer} ${className}`}
      style={{ height, overflowY: 'auto' }}
      onScroll={handleScroll}
    >
      <div 
        className={styles.virtualizedContent}
        style={{ 
          height: totalHeight,
          position: 'relative',
        }}
      >
        <div 
          className={styles.virtualizedItems}
          style={{ 
            transform: `translateY(${topPadding}px)`,
          }}
        >
          {items.slice(startIndex, endIndex + 1).map((item, relIndex) => {
            const actualIndex = startIndex + relIndex;
            return (
              <div 
                key={actualIndex}
                className={styles.virtualizedItem}
                style={{ 
                  height: itemHeights[actualIndex], 
                }}
              >
                {renderItem(item, actualIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(VirtualizedList);
