import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error }) => {
  return (
    <div className="p-4 text-red-500 text-center">
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
    </div>
  );
};

export const AppErrorBoundary = ({ children }) => {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
};
