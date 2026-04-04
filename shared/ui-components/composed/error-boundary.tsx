"use client";

import { Component, type ReactNode } from "react";

import { ErrorState } from "@/shared/ui-components/composed/error-state";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch() {
    // Intentionally noop for now; hook to external logging later.
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <ErrorState
            title="Something went wrong"
            description="This section crashed unexpectedly. Please try again."
            onRetry={this.handleRetry}
          />
        )
      );
    }

    return this.props.children;
  }
}
