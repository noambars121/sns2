import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });

    // Log error to your preferred error tracking service
    console.error("Error caught by boundary:", {
      error,
      errorInfo,
      url: window.location.href,
      userAgent: navigator.userAgent,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-center">
          <div className="mb-6 rounded-full bg-red-500/10 p-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-white">
            Something went wrong
          </h2>
          <p className="mb-6 max-w-md text-gray-400">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => window.location.reload()}
              className="rounded-full bg-[#9FE65C] text-black hover:bg-[#9FE65C]/90"
            >
              Reload Page
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="rounded-full border-white text-white hover:bg-white/10"
            >
              Go Back
            </Button>
          </div>
          {process.env.NODE_ENV === "development" && this.state.errorInfo && (
            <pre className="mt-8 max-w-2xl overflow-auto rounded-lg bg-gray-900 p-4 text-left text-sm text-gray-300">
              {this.state.errorInfo.componentStack}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
