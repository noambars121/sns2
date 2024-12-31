import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  text?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export function LoadingState({
  text,
  className,
  size = "md",
  variant = "light",
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-3",
  };

  const variantClasses = {
    light: "border-white/20 border-t-white",
    dark: "border-black/20 border-t-black",
  };

  return (
    <div className={cn("flex items-center gap-3", className)} role="status">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={cn(
          "rounded-full border",
          sizeClasses[size],
          variantClasses[variant],
        )}
      />
      {text && (
        <span
          className={cn(
            "text-sm",
            variant === "light" ? "text-white" : "text-black",
          )}
        >
          {text}
        </span>
      )}
    </div>
  );
}
