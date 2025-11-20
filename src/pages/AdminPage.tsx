export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Quản trị hệ thống
          </h1>
          
          <div className="space-y-6">
            {/* Data Management */}
            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Quản lý dữ liệu
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Tỉnh/Thành cũ</div>
                  <div className="text-2xl font-bold text-blue-600">63</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Tỉnh/Thành mới</div>
                  <div className="text-2xl font-bold text-green-600">34</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Số thay đổi</div>
                  <div className="text-2xl font-bold text-orange-600">14</div>
                </div>
              </div>
            </section>

            {/* System Info */}
            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Thông tin hệ thống
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Phiên bản:</span>
                  <span className="font-medium">1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Công nghệ:</span>
                  <span className="font-medium">React 18 + TypeScript + Vite</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày hiệu lực:</span>
                  <span className="font-medium">12/6/2025</span>
                </div>
              </div>
            </section>

            {/* Actions */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Thao tác
              </h2>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Cập nhật dữ liệu
                </button>
                <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Xuất báo cáo
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
