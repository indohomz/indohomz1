import React from 'react'

type Props = { children: React.ReactNode; fallback?: React.ReactNode }
type State = { hasError: boolean; error?: any; errorInfo?: any }

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }

  componentDidCatch(error: any, info: any) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, info)
    this.setState({ errorInfo: info })
  }

  render() {
    if (this.state.hasError) {
      // In development, show the error details
      if (import.meta.env.DEV) {
        return (
          <div className="min-h-screen bg-red-50 p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Development Error</h1>
            <pre className="bg-white p-4 rounded-lg overflow-auto text-sm text-red-800 border border-red-200">
              {this.state.error?.toString()}
              {'\n\n'}
              {this.state.errorInfo?.componentStack}
            </pre>
          </div>
        )
      }
      return this.props.fallback ?? (
        <div className="card border border-danger-200 dark:border-danger-800">
          <div className="text-danger-600 font-semibold mb-2">Something went wrong</div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">Try again or refresh the page.</p>
        </div>
      )
    }
    return this.props.children
  }
}
