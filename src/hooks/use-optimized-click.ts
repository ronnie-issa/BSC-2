import { useCallback } from 'react';
import { optimizeClickHandler, optimizeClickHandlerWithParams } from '@/lib/performance';

/**
 * Custom hook that creates an optimized click handler
 *
 * This hook wraps a click handler function with performance optimizations:
 * 1. Throttles the handler to prevent rapid clicks
 * 2. Uses requestAnimationFrame to ensure UI updates happen in the next frame
 * 3. Measures and logs performance metrics
 *
 * @param handler The original click handler function
 * @param options Configuration options
 * @returns An optimized click handler
 */
export function useOptimizedClick<T extends (e: React.MouseEvent) => void>(
  handler: T,
  options: {
    throttleTime?: number;
    measureName?: string;
    preventDefault?: boolean;
    dependencies?: any[];
  } = {}
): (e: React.MouseEvent) => void {
  const {
    throttleTime = 100,
    measureName = 'Click Handler',
    preventDefault = false,
    dependencies = []
  } = options;

  // Use useCallback to maintain reference stability
  return useCallback(
    (e: React.MouseEvent) => {
      // Create an optimized handler
      const optimizedHandler = optimizeClickHandler(handler, {
        throttleTime,
        measureName,
        preventDefault
      });

      // Call the optimized handler
      optimizedHandler(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...dependencies]
  );
}

/**
 * Custom hook that creates an optimized click handler that can accept additional parameters
 *
 * This version allows passing additional parameters to the click handler beyond just the event
 *
 * @param handler The original click handler function that takes additional parameters
 * @param options Configuration options
 * @returns An optimized click handler that accepts the same parameters
 */
export function useOptimizedClickWithParams<P extends any[]>(
  handler: (e: React.MouseEvent, ...params: P) => void,
  options: {
    throttleTime?: number;
    measureName?: string;
    preventDefault?: boolean;
    dependencies?: any[];
  } = {}
): (e: React.MouseEvent, ...params: P) => void {
  const {
    throttleTime = 100,
    measureName = 'Click Handler With Params',
    preventDefault = false,
    dependencies = []
  } = options;

  // Use useCallback to maintain reference stability
  return useCallback(
    (e: React.MouseEvent, ...params: P) => {
      // Create an optimized handler that supports parameters
      const optimizedHandler = optimizeClickHandlerWithParams(handler, {
        throttleTime,
        measureName,
        preventDefault
      });

      // Call the optimized handler with all parameters
      optimizedHandler(e, ...params);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...dependencies]
  );
}
