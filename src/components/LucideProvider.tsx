import React from "react";
import { LucideProps } from "lucide-react";

// Create a context for Lucide default props
export const LucideContext = React.createContext<Partial<LucideProps>>({
  strokeWidth: 1.5, // Default to medium variant
});

interface LucideProviderProps {
  children: React.ReactNode;
  defaultProps?: Partial<LucideProps>;
}

/**
 * Provider component that sets default props for all Lucide icons
 *
 * This provider allows setting global defaults for all Lucide icons
 * in the application, such as stroke width, color, and size.
 *
 * @example
 * ```tsx
 * <LucideProvider defaultProps={{ strokeWidth: 1.5 }}>
 *   <App />
 * </LucideProvider>
 * ```
 */
export const LucideProvider: React.FC<LucideProviderProps> = ({
  children,
  defaultProps = { strokeWidth: 1.5 },
}) => {
  return (
    <LucideContext.Provider value={defaultProps}>
      {children}
    </LucideContext.Provider>
  );
};

/**
 * Hook to access Lucide default props
 */
export const useLucideDefaults = () => React.useContext(LucideContext);
