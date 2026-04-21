import { AppErrorBoundary } from '@/components/common/errorBoundary/ErrorBoundary';
import Header from '@/components/common/header/Header';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <AppErrorBoundary>
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </AppErrorBoundary>
    </div>
  );
};
export default MainLayout;
