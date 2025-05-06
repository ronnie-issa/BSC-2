/**
 * Performance utilities for optimizing React components and event handlers
 */
import React from 'react';

/**
 * Debounces a function to prevent it from being called too frequently
 * @param func The function to debounce
 * @param wait The time to wait in milliseconds
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttles a function to limit how often it can be called
 * @param func The function to throttle
 * @param limit The minimum time between calls in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      lastRan = Date.now();
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * Memoizes a function to cache its results based on input arguments
 * @param func The function to memoize
 * @returns A memoized version of the function
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();

  return function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  };
}

/**
 * Measures the execution time of a function
 * @param func The function to measure
 * @param name Optional name for logging
 * @returns A wrapped function that logs execution time
 */
export function measurePerformance<T extends (...args: any[]) => any>(
  func: T,
  name: string = func.name || 'Anonymous Function'
): T {
  return ((...args: any[]) => {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();

    console.log(`[Performance] ${name} took ${(end - start).toFixed(2)}ms`);

    // Log to console if execution time is over 100ms
    if (end - start > 100) {
      console.warn(`[Performance Warning] ${name} took ${(end - start).toFixed(2)}ms - consider optimizing`);
    }

    return result;
  }) as T;
}

/**
 * Wraps a click handler with performance optimizations
 * @param handler The click handler function
 * @param options Configuration options
 * @returns An optimized click handler
 */
export function optimizeClickHandler<T extends (e: React.MouseEvent) => void>(
  handler: T,
  options: {
    throttleTime?: number;
    measureName?: string;
    preventDefault?: boolean;
  } = {}
): (e: React.MouseEvent) => void {
  const {
    throttleTime = 100,
    measureName = handler.name || 'Click Handler',
    preventDefault = false
  } = options;

  // Apply throttling to prevent rapid clicks
  const throttledHandler = throttle(handler, throttleTime);

  // Wrap with performance measurement
  const measuredHandler = measurePerformance(
    throttledHandler as (e: React.MouseEvent) => void,
    measureName
  );

  // Return the optimized handler
  return function (e: React.MouseEvent) {
    if (preventDefault) {
      e.preventDefault();
    }

    // Use requestAnimationFrame to ensure the handler runs in the next frame
    // This helps prevent jank during click handling
    requestAnimationFrame(() => {
      measuredHandler(e);
    });
  };
}

/**
 * Wraps a click handler with performance optimizations and supports additional parameters
 * @param handler The click handler function that takes additional parameters
 * @param options Configuration options
 * @returns An optimized click handler that accepts the same parameters
 */
export function optimizeClickHandlerWithParams<P extends any[]>(
  handler: (e: React.MouseEvent, ...params: P) => void,
  options: {
    throttleTime?: number;
    measureName?: string;
    preventDefault?: boolean;
  } = {}
): (e: React.MouseEvent, ...params: P) => void {
  const {
    throttleTime = 100,
    measureName = handler.name || 'Click Handler With Params',
    preventDefault = false
  } = options;

  // Create a throttled version of the handler that preserves parameters
  const throttledHandler = (e: React.MouseEvent, ...args: P) => {
    handler(e, ...args);
  };

  // Apply throttling
  const throttledFn = throttle(throttledHandler, throttleTime);

  // Return the optimized handler that accepts additional parameters
  return function (e: React.MouseEvent, ...params: P) {
    if (preventDefault) {
      e.preventDefault();
    }

    // Use requestAnimationFrame to ensure the handler runs in the next frame
    // This helps prevent jank during click handling
    requestAnimationFrame(() => {
      // Start performance measurement
      const start = performance.now();

      // Call the throttled handler with all parameters
      throttledFn(e, ...params);

      // End performance measurement
      const end = performance.now();
      console.log(`[Performance] ${measureName} took ${(end - start).toFixed(2)}ms`);

      // Log to console if execution time is over 100ms
      if (end - start > 100) {
        console.warn(`[Performance Warning] ${measureName} took ${(end - start).toFixed(2)}ms - consider optimizing`);
      }
    });
  };
}

/**
 * Creates a memoized version of a calculation function that only recalculates
 * when dependencies change
 * @param calculateFn The calculation function
 * @param deps Dependencies array that triggers recalculation when changed
 * @returns The memoized calculation result
 */
export function memoizedCalculation<T>(
  calculateFn: () => T,
  deps: React.DependencyList
): T {
  const cache = React.useRef<{
    deps: React.DependencyList;
    result: T;
  } | null>(null);

  if (
    cache.current === null ||
    deps.length !== cache.current.deps.length ||
    deps.some((dep, i) => dep !== cache.current!.deps[i])
  ) {
    cache.current = {
      deps,
      result: calculateFn(),
    };
  }

  return cache.current.result;
}
