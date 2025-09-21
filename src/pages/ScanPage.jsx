import QRScanner from '../components/QRScanner';

const ScanPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <QRScanner />
    </div>
  );
};

export default ScanPage;