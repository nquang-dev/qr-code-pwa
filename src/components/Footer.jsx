import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
          <div className="mb-2 sm:mb-0">
            <p>&copy; 2025 QR PWA. Huỳnh Nhật Quang (quanghn-dev).</p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/nquang-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;