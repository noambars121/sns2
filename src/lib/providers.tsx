import { createContext, useContext, useState, useEffect } from "react";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useTheme } from "@/lib/theme";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => null,
});

export function useLoading() {
  return useContext(LoadingContext);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Initialize theme on mount
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <ToastProvider>
        {children}
        <Toaster />
      </ToastProvider>
    </LoadingContext.Provider>
  );
}
