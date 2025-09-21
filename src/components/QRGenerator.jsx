import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Check } from 'lucide-react';

const QRGenerator = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);

  const downloadQR = () => {
    if (!text.trim()) return;

    
    const svgElement = document.querySelector('#qr-code-canvas svg');
    if (!svgElement) return;

    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      
      const link = document.createElement('a');
      link.download = `qr-code-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const copyToClipboard = async () => {
    if (!text.trim()) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Trình tạo mã QR</h2>
          <p className="text-blue-100">Nhập bất kỳ văn bản hoặc URL nào để tạo mã QR</p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Input Section */}
          <div>
            <label htmlFor="qr-input" className="block text-sm font-medium text-gray-700 mb-2">
              Văn bản hoặc URL
            </label>
            <textarea
              id="qr-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Nhập văn bản, URL hoặc bất kỳ dữ liệu nào để tạo mã QR..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
            {text && isValidUrl(text) && (
              <p className="mt-1 text-sm text-green-600">✓ URL hợp lệ được phát hiện</p>
            )}
          </div>

          {/* QR Code Display */}
          {text.trim() && (
            <div className="text-center space-y-4">
              <div 
                id="qr-code-canvas" 
                className="inline-block p-6 bg-white border-2 border-gray-200 rounded-lg"
              >
                <QRCodeSVG
                  value={text}
                  size={250}
                  level="M"
                  includeMargin={true}
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={downloadQR}
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Tải xuống PNG
                </button>
                
                <button
                  onClick={copyToClipboard}
                  className={`inline-flex items-center justify-center px-4 py-2 border rounded-lg transition-colors ${
                    copied 
                      ? 'border-green-500 text-green-600 bg-green-50' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Đã sao chép!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      Sao chép văn bản
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!text.trim() && (
            <div className="text-center py-12 text-gray-500">
              <QRCodeSVG value="QR PWA" size={120} level="M" className="mx-auto mb-4 opacity-30" />
              <p>Nhập văn bản ở trên để tạo mã QR của bạn</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;