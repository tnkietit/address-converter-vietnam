# 🗺️ Chuyển đổi Địa chỉ Hành chính Việt Nam

Web app chuyển đổi địa chỉ hành chính Việt Nam (Cũ ↔ Mới) theo quy hoạch sắp xếp đơn vị hành chính.

## ✨ Tính năng chính

- 🔄 **Chuyển đổi hai chiều**: Cũ → Mới và Mới → Cũ
- 🔍 **Tìm kiếm nhanh**: Autocomplete cho tỉnh/huyện/xã
- 📋 **Chuyển đổi hàng loạt**: Upload CSV hoặc paste nhiều địa chỉ
- 📝 **Lịch sử tra cứu**: Lưu trữ local trong trình duyệt
- 📱 **Responsive**: Tối ưu cho mobile và desktop
- ⚡ **Nhanh**: Chạy hoàn toàn trên client-side

## 🛠️ Công nghệ sử dụng

- **React 18** + **TypeScript**
- **Vite** - Build tool cực nhanh
- **Tailwind CSS** - Styling
- **React Router** - Routing

## 🚀 Hướng dẫn cài đặt

### 1. Clone repository

```bash
git clone https://github.com/tnkietit/address-converter-vietnam.git
cd address-converter-vietnam
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

### 4. Build production

```bash
npm run build
```

File build sẽ nằm trong thư mục `dist/`

## 📁 Cấu trúc thư mục

```
src/
├── components/          # React components
│   ├── AddressForm.tsx
│   ├── ResultCard.tsx
│   ├── HistoryList.tsx
│   ├── BatchConverter.tsx
│   └── SearchBar.tsx
├── pages/              # Pages
│   ├── HomePage.tsx
│   └── AdminPage.tsx
├── data/               # Dữ liệu JSON
│   ├── provinces-old.json
│   ├── provinces-new.json
│   └── mapping.json
├── utils/              # Utilities
│   ├── addressMapper.ts
│   └── csvParser.ts
├── hooks/              # Custom hooks
│   └── useAddressMapping.ts
├── types/              # TypeScript types
│   └── address.ts
├── App.tsx
└── main.tsx
```

## 📊 Cấu trúc dữ liệu

### provinces-old.json
```json
{
  "provinces": [
    {
      "id": "79",
      "name": "Thành phố Hồ Chí Minh",
      "code": "SG"
    }
  ],
  "districts": [...],
  "wards": [...]
}
```

### mapping.json
```json
{
  "provinces": [
    {
      "oldIds": ["20", "36"],
      "newId": "20",
      "note": "Gộp tỉnh Hà Tây vào Hà Nội"
    }
  ],
  "districts": [...],
  "wards": [...]
}
```

## 🔧 Cập nhật dữ liệu

1. Chỉnh sửa file JSON trong thư mục `public/data/`
2. Đảm bảo cấu trúc JSON đúng format
3. Rebuild project: `npm run build`

## 🌐 Deploy

### Vercel

1. Push code lên GitHub
2. Import project vào Vercel
3. Deploy tự động

### Netlify

1. Kết nối repository
2. Build command: `npm run build`
3. Publish directory: `dist`

## 📝 License

MIT License

## 👨‍💻 Author

**tnkietit** - [GitHub](https://github.com/tnkietit)

---

⚠️ **Lưu ý**: Dữ liệu mang tính tham khảo, cần đối chiếu với văn bản pháp lý chính thức.
