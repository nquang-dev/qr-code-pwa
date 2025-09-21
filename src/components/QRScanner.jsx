import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Camera, CameraOff, Copy, Check, ExternalLink, AlertCircle } from 'lucide-react';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [cameraSupported, setCameraSupported] = useState(true);
  const scannerRef = useRef(null);
  const html5QrcodeScanner = useRef(null);

  useEffect(() => {
    
    const checkCameraSupport = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraSupported(false);
        setError('Truy cập camera không được hỗ trợ trong trình duyệt này.');
        return;
      }

      if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        setCameraSupported(false);
        setError('Truy cập camera yêu cầu HTTPS. Vui lòng sử dụng kết nối bảo mật.');
        return;
      }
    };

    checkCameraSupport();

    return () => {
      
      if (html5QrcodeScanner.current) {
        html5QrcodeScanner.current.clear();
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      setError('');
      setIsScanning(true);

      
      if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        throw new Error('Truy cập camera yêu cầu HTTPS. Vui lòng sử dụng kết nối bảo mật.');
      }

      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Truy cập camera không được hỗ trợ trong trình duyệt này.');
      }

      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        stream.getTracks().forEach(track => track.stop());
      } catch (permissionError) {
        throw new Error('Quyền camera bị từ chối. Vui lòng cho phép truy cập camera và thử lại.');
      }

      
      if (html5QrcodeScanner.current) {
        await html5QrcodeScanner.current.clear();
      }

      
      html5QrcodeScanner.current = new Html5QrcodeScanner(
        "qr-scanner",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true,
          videoConstraints: {
            facingMode: 'environment' 
          }
        },
        false
      );

      html5QrcodeScanner.current.render(
        (decodedText, decodedResult) => {
          setScanResult(decodedText);
          stopScanning();
        },
        (error) => {
          
          if (error.includes('NotFoundException')) {
            
            return;
          }
          console.warn('QR scan error:', error);
        }
      );
    } catch (err) {
      setError(err.message || 'Không thể khởi động camera. Vui lòng kiểm tra quyền.');
      setIsScanning(false);
      console.error('Scanner error:', err);
    }
  };

  const stopScanning = async () => {
    try {
      if (html5QrcodeScanner.current) {
        await html5QrcodeScanner.current.clear();
        html5QrcodeScanner.current = null;
      }
      setIsScanning(false);
    } catch (err) {
      console.error('Error stopping scanner:', err);
      setIsScanning(false);
    }
  };

  const copyToClipboard = async () => {
    if (!scanResult) return;
    
    try {
      await navigator.clipboard.writeText(scanResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const openLink = () => {
    if (isValidUrl(scanResult)) {
      window.open(scanResult, '_blank', 'noopener,noreferrer');
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

  const clearResult = () => {
    setScanResult('');
    setError('');
  };

  const testCamera = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      stream.getTracks().forEach(track => track.stop());
      setError('Kiểm tra camera thành công! Bây giờ bạn có thể bắt đầu quét.');
    } catch (err) {
      setError(`Kiểm tra camera thất bại: ${err.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Trình quét mã QR</h2>
          <p className="text-green-100">Hướng camera vào mã QR để quét</p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Scanner Section */}
          <div className="text-center">
            {!cameraSupported && (
              <div className="space-y-4">
                <div className="mx-auto w-64 h-64 border-2 border-dashed border-red-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
                    <p className="text-red-500">Camera không được hỗ trợ</p>
                  </div>
                </div>
              </div>
            )}

            {cameraSupported && !isScanning && !scanResult && (
              <div className="space-y-4">
                <div className="mx-auto w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Xem trước camera sẽ xuất hiện ở đây</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={startScanning}
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Bắt đầu quét
                  </button>
                  
                  <button
                    onClick={testCamera}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Kiểm tra camera
                  </button>
                </div>
              </div>
            )}

            {cameraSupported && isScanning && (
              <div className="space-y-4">
                <div id="qr-scanner" className="mx-auto"></div>
                <button
                  onClick={stopScanning}
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <CameraOff className="w-5 h-5 mr-2" />
                  Dừng quét
                </button>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              {/* <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> */}
              <div>
       
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Scan Result */}
          {scanResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Kết quả quét:</h3>
                <div className="bg-white p-3 rounded border break-all">
                  <p className="text-gray-800">{scanResult}</p>
                </div>
                {isValidUrl(scanResult) && (
                  <p className="mt-2 text-sm text-green-600">✓ URL hợp lệ được phát hiện</p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={copyToClipboard}
                  className={`inline-flex items-center justify-center px-4 py-2 border rounded-lg transition-colors ${
                    copied 
                      ? 'border-green-500 text-green-600 bg-green-100' 
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
                
                {isValidUrl(scanResult) && (
                  <button
                    onClick={openLink}
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Mở liên kết
                  </button>
                )}
                
                <button
                  onClick={clearResult}
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Quét thêm
                </button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Hướng dẫn:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Cho phép truy cập camera khi được nhắc</li>
              <li>• Đảm bảo bạn đang sử dụng HTTPS hoặc localhost</li>
              <li>• Giữ thiết bị ổn định và căn giữa mã QR</li>
              <li>• Đảm bảo ánh sáng tốt để có kết quả tốt nhất</li>
              <li>• Việc quét sẽ diễn ra tự động khi phát hiện</li>
            </ul>
            
            {location.protocol !== 'https:' && location.hostname !== 'localhost' && (
              <div className="mt-3 p-2 bg-yellow-100 rounded border border-yellow-300">
                <p className="text-sm text-yellow-800">
                  ⚠️ Camera yêu cầu HTTPS. Hãy cân nhắc sử dụng localhost để kiểm tra.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;