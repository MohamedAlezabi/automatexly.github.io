import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props { children?: ReactNode; }
interface State { hasError: boolean; error?: Error; }

class ErrorBoundary extends Component<Props, State> {
    public state: State = { hasError: false };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex h-screen w-full flex-col items-center justify-center p-8 text-center text-foreground bg-background">
                    <div className="max-w-md w-full p-8 rounded-2xl glass border border-border">
                        <h1 className="text-4xl font-bold mb-4 gradient-purple bg-clip-text text-transparent">System Error</h1>
                        <p className="text-muted-foreground mb-6">Something unexpected happened.</p>
                        <div className="text-left bg-black/40 p-4 rounded-lg overflow-auto text-xs font-mono text-red-400 mb-6">
                            {this.state.error?.message}
                        </div>
                        <button
                            className="w-full px-4 py-3 bg-white text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
                            onClick={() => window.location.reload()}
                        >
                            Reboot System
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
