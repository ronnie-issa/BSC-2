# Omnis Performance Monitoring System

This document explains the automated performance monitoring system implemented in the Omnis application.

## Overview

The performance monitoring system automatically tracks and logs performance issues in the application during development. It provides a visual dashboard for reviewing performance metrics without requiring constant manual checking of the console.

## Features

- **Automated Logging**: Automatically detects and logs performance issues
- **Visual Dashboard**: Provides a UI for reviewing performance metrics
- **Persistent Storage**: Stores logs across page refreshes
- **Multiple Monitoring Types**:
  - Long-running tasks
  - Slow event handlers
  - Component render times
  - Network request durations

## How to Use

### Accessing the Dashboard

In development mode, a small "P" button appears in the bottom-right corner of the screen. Click this button to open the performance dashboard.

### Dashboard Features

- **Filtering**: Filter logs by type (long tasks, event handlers, renders, network)
- **Session Management**: View logs from current session or all sessions
- **Refresh**: Manually refresh logs
- **Clear**: Clear all logs

### Interpreting the Logs

Logs are color-coded by severity:
- **Red**: Critical issues (>150ms)
- **Yellow**: Warning issues (100-150ms)
- **Green**: Informational logs (<100ms)

Each log entry includes:
- **Time**: When the issue occurred
- **Type**: The type of performance issue
- **Duration**: How long the operation took
- **Details**: Additional information about the issue

## Implementation Details

The system consists of several components:

1. **Performance Logger** (`src/utils/performance-logger.ts`):
   - Core logging functionality
   - Stores and manages log entries
   - Persists logs to localStorage

2. **Performance Monitor** (`src/utils/performance-monitor.ts`):
   - Monitors long-running tasks
   - Tracks event handler performance

3. **Network Monitor** (`src/utils/network-monitor.ts`):
   - Monitors fetch and XHR requests
   - Tracks slow network operations

4. **Component Performance Tracking** (`src/utils/withPerformanceTracking.tsx`):
   - HOC for tracking component render times
   - Hook for tracking functional component performance

5. **Performance Dashboard** (`src/components/PerformanceDashboard.tsx`):
   - Visual interface for reviewing logs
   - Filtering and management tools

## Configuration

The system is configured in `src/main.tsx` with the following default settings:

```typescript
// Configure performance logger
performanceLogger.configure({
  maxLogs: 200,                // Store up to 200 logs
  errorThreshold: 150,         // Errors for operations over 150ms
  warningThreshold: 100,       // Warnings for operations over 100ms
  enabled: true                // Enable logging
});

// Initialize performance monitoring
initPerformanceMonitoring({
  longTasks: true,             // Monitor long tasks
  eventHandlers: false,        // Disable event handler monitoring to avoid React DevTools conflicts
  longTaskThreshold: 100,      // Only log tasks that take more than 100ms
  eventHandlerThreshold: 150,  // Higher threshold for event handlers (if enabled)
});

// Initialize network monitoring
initNetworkMonitoring({
  threshold: 1000              // Log network requests that take more than 1000ms (1 second)
});
```

## Production Behavior

The performance monitoring system is **only active in development mode**. In production:
- No monitoring code is executed
- No logs are generated
- No performance impact occurs

## Tracking Component Performance

To track performance of specific components, you can use the provided HOC or hook:

```tsx
// Using the HOC
import { withPerformanceTracking } from '@/utils/withPerformanceTracking';

const MyComponent = () => {
  // Component implementation
};

export default withPerformanceTracking(MyComponent, { threshold: 50 });

// Using the hook
import { useRenderPerformance } from '@/utils/withPerformanceTracking';

const MyFunctionalComponent = () => {
  useRenderPerformance('MyFunctionalComponent', 50);
  
  // Component implementation
};
```

## Troubleshooting

If you encounter issues with the performance monitoring system:

1. **Dashboard Not Appearing**: Ensure you're in development mode
2. **No Logs Being Generated**: Check that monitoring is enabled in the configuration
3. **Too Many Logs**: Adjust thresholds to reduce noise
4. **Browser Performance Issues**: Temporarily disable monitoring if needed

## Best Practices

- Review the dashboard periodically during development
- Focus on fixing critical (red) issues first
- Look for patterns in performance issues
- Use component tracking for complex components
- Adjust thresholds based on your application's needs
