import { Link, useLocation } from 'react-router-dom';
import { QrCode, Scan } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
            <QrCode className="w-8 h-8" />
            <span className="hidden sm:inline">QR PWA</span>
          </Link>
          
          <div className="flex space-x-1 sm:space-x-4">
            <Link
              to="/generate"
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === '/generate'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <QrCode className="w-5 h-5" />
              <span className="hidden sm:inline">Tạo</span>
            </Link>
            <Link
              to="/scan"
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === '/scan'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Scan className="w-5 h-5" />
              <span className="hidden sm:inline">Quét</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;