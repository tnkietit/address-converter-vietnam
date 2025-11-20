// Cấu trúc dữ liệu cho đơn vị hành chính

/** Tỉnh/Thành phố */
export interface Province {
  id: string;
  name: string;
  code: string;
  type?: string; // "Thành phố" | "Tỉnh"
}

/** Quận/Huyện/Thị xã */
export interface District {
  id: string;
  name: string;
  provinceId: string;
  code: string;
  type?: string; // "Quận" | "Huyện" | "Thị xã" | "Thành phố"
}

/** Xã/Phường/Thị trấn */
export interface Ward {
  id: string;
  name: string;
  districtId: string;
  code: string;
  type?: string; // "Xã" | "Phường" | "Thị trấn"
}

/** Dữ liệu địa chỉ hành chính */
export interface AddressData {
  provinces: Province[];
  districts: District[];
  wards: Ward[];
}

/** Mapping giữa cũ và mới cho từng cấp */
export interface ProvinceMapping {
  oldIds: string[]; // Danh sách ID của các tỉnh cũ gộp lại
  newId: string; // ID của tỉnh mới
  note?: string; // Ghi chú về việc gộp
}

export interface DistrictMapping {
  oldIds: string[];
  newId: string;
  provinceOldId: string; // Thuộc tỉnh cũ nào
  provinceNewId: string; // Thuộc tỉnh mới nào
  note?: string;
}

export interface WardMapping {
  oldIds: string[];
  newId: string;
  districtOldId: string;
  districtNewId: string;
  note?: string;
}

/** Toàn bộ dữ liệu mapping */
export interface MappingData {
  provinces: ProvinceMapping[];
  districts: DistrictMapping[];
  wards: WardMapping[];
}

/** Địa chỉ đầy đủ */
export interface FullAddress {
  province?: Province;
  district?: District;
  ward?: Ward;
  streetAddress?: string; // Số nhà, tên đường
}

/** Kết quả chuyển đổi địa chỉ */
export interface ConversionResult {
  success: boolean;
  oldAddress?: FullAddress;
  newAddress?: FullAddress;
  note?: string;
  error?: string;
}

/** Lịch sử tra cứu */
export interface HistoryItem {
  id: string;
  timestamp: number;
  direction: 'old-to-new' | 'new-to-old';
  input: FullAddress;
  output: FullAddress | FullAddress[]; // Có thể nhiều kết quả
  note?: string;
}

/** Item cho batch conversion */
export interface BatchItem {
  index: number;
  input: string;
  parsed?: FullAddress;
  result?: ConversionResult;
  error?: string;
}
