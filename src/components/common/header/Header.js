import { memo } from 'react';
import { FileChartLine } from 'lucide-react';

const Header = memo(() => {
  return (
    <header className="sticky top-0 z-50 flex items-center gap-3 px-6 py-4 bg-white shadow-sm">
      <div className="p-2 bg-blue-100 rounded-lg">
        <FileChartLine className="text-blue-400" size={20} />
      </div>
      <h1 className="text-lg font-semibold text-gray-800">Rewards Dashboard</h1>
    </header>
  );
});

export default Header;
