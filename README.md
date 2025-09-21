# QR Code PWA

Ứng dụng Web Tiến bộ (PWA) để tạo và quét mã QR. Ứng dụng này cho phép người dùng tạo mã QR từ văn bản hoặc URL, tải xuống dưới dạng hình ảnh PNG, và quét mã QR bằng camera thiết bị để giải mã nội dung.

## Chức năng của ứng dụng

Ứng dụng PWA này cung cấp các chức năng chính sau:

### Tạo mã QR

- Nhập bất kỳ văn bản, URL hoặc dữ liệu nào để tạo mã QR
- Hiển thị mã QR dưới dạng SVG với kích thước tùy chỉnh
- Tải xuống mã QR dưới dạng tệp hình ảnh PNG
- Sao chép văn bản gốc vào clipboard
- Phát hiện và xác nhận URL hợp lệ

### Quét mã QR

- Sử dụng camera thiết bị để quét mã QR
- Quét tự động khi phát hiện mã QR
- Hiển thị nội dung đã giải mã
- Sao chép nội dung vào clipboard
- Mở liên kết nếu nội dung là URL hợp lệ
- Kiểm tra quyền truy cập camera
- Hỗ trợ chế độ camera sau (rear camera) cho thiết bị di động

### Tính năng PWA

- Cài đặt như ứng dụng gốc trên mọi thiết bị
- Hoạt động ngoại tuyến với các tính năng cơ bản
- Giao diện đáp ứng cho tất cả kích thước màn hình
- Hiệu suất nhanh với React và Vite
- Thiết kế hiện đại với Tailwind CSS và Framer Motion

## Cấu trúc thư mục

```
qr-code-pwa/
├── public/
│   ├── vite.svg
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── QRGenerator.jsx
│   │   └── QRScanner.jsx
│   ├── pages/
│   │   ├── GeneratePage.jsx
│   │   ├── HomePage.jsx
│   │   └── ScanPage.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Cách sử dụng

### Cài đặt

1. Đảm bảo bạn đã cài đặt Node.js (phiên bản 16 trở lên) và npm.

2. Sao chép repository:

   ```bash
   git clone <repository-url>
   cd qr-code-pwa
   ```

3. Cài đặt các dependencies:
   ```bash
   npm install
   ```

### Chạy ứng dụng

Để chạy ứng dụng ở chế độ phát triển:

```bash
npm run dev
```

Ứng dụng sẽ chạy trên `http://localhost:5174`.

### Xây dựng cho sản xuất

Để xây dựng ứng dụng cho sản xuất:

```bash
npm run build
```

Tệp xây dựng sẽ được tạo trong thư mục `dist/`.

### Xem trước bản xây dựng

Để xem trước bản xây dựng sản xuất:

```bash
npm run preview
```

### Cài đặt như PWA

1. Mở ứng dụng trong trình duyệt hỗ trợ PWA (Chrome, Edge, Safari, etc.)
2. Nhấp vào nút cài đặt trong thanh địa chỉ hoặc menu
3. Ứng dụng sẽ được cài đặt như ứng dụng gốc trên thiết bị

### Sử dụng các tính năng

#### Tạo mã QR

1. Truy cập trang "Tạo" từ menu điều hướng
2. Nhập văn bản hoặc URL vào trường nhập liệu
3. Mã QR sẽ được tạo và hiển thị tự động
4. Nhấp "Tải xuống PNG" để lưu mã QR
5. Nhấp "Sao chép văn bản" để sao chép nội dung gốc

#### Quét mã QR

1. Truy cập trang "Quét" từ menu điều hướng
2. Cho phép truy cập camera khi được nhắc
3. Hướng camera vào mã QR
4. Nội dung sẽ được hiển thị tự động khi quét thành công
5. Sử dụng các nút để sao chép hoặc mở liên kết

## Công nghệ sử dụng

- **React**: Thư viện JavaScript cho giao diện người dùng
- **Vite**: Công cụ xây dựng và máy chủ phát triển
- **Tailwind CSS**: Framework CSS utility-first
- **Framer Motion**: Thư viện animation cho React
- **html5-qrcode**: Thư viện quét mã QR
- **qrcode.react**: Thư viện tạo mã QR
- **vite-plugin-pwa**: Plugin để thêm tính năng PWA
