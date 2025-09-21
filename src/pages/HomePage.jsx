import { Link } from 'react-router-dom';
import { QrCode, Scan, Smartphone, Wifi, Download } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
            <QrCode className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            QR Code PWA
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tạo và quét mã QR ngay lập tức với Ứng dụng Web Tiến bộ của chúng tôi. 
            Hoạt động ngoại tuyến, cài đặt trên mọi thiết bị, và hoàn toàn miễn phí sử dụng.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/generate"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <QrCode className="w-6 h-6 mr-3" />
              Tạo mã QR
            </Link>
            <Link
              to="/scan"
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              <Scan className="w-6 h-6 mr-3" />
              Quét mã QR
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <QrCode className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tạo mã QR</h3>
            <p className="text-gray-600">
              Tạo mã QR từ bất kỳ văn bản, URL hoặc dữ liệu nào. Tải xuống dưới dạng hình ảnh PNG ngay lập tức.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <Scan className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quét mã QR</h3>
            <p className="text-gray-600">
              Sử dụng camera thiết bị để quét mã QR và giải mã nội dung ngay lập tức.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <Smartphone className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ứng dụng Web Tiến bộ</h3>
            <p className="text-gray-600">
              Cài đặt trên mọi thiết bị như ứng dụng gốc. Hoạt động mượt mà trên tất cả nền tảng.
            </p>
          </div>
        </div>

       

        {/* Install Instructions */}
        
      </div>
    </div>
  );
};

export default HomePage;