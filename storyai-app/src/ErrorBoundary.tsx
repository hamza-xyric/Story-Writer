// Error Boundary to catch React errors

import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'monospace', backgroundColor: '#fef2f2', minHeight: '100vh' }}>
          <h1 style={{ color: '#dc2626', marginBottom: '20px' }}>Something went wrong</h1>
          <pre style={{
            backgroundColor: '#fee2e2',
            padding: '20px',
            borderRadius: '8px',
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            <strong>Error:</strong> {this.state.error?.message}
            {'\n\n'}
            <strong>Stack:</strong>
            {'\n'}
            {this.state.error?.stack}
            {'\n\n'}
            <strong>Component Stack:</strong>
            {'\n'}
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
