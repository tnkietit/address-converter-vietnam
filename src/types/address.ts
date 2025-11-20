// src/types/address.ts

export interface Province {
  id: string;
  name: string;
  code?: string; // ví dụ: "SG"
}

export interface District {
  id: string;
  name: string;
  provinceId: string;
  code?: string;
}

export interface Ward {
  id: string;
  name: string;
  districtId: string;
  code?: string;
}

/**
 * Địa chỉ đầy đủ dùng cho kết quả convert
 */
export interface FullAddress {
  // dùng cho CSV export / hiển thị
  id?: string;
  name?: string;   // tên hiển thị ngắn gọn
  code?: string;   // mã ngắn (nếu có)

  province?: Province;
  district?: District | null;
  ward?: Ward | null;

  street?: string;
}

/**
 * Một dòng mapping trong mapping.json
 */
export interface MappingItem {
  oldIds: string[];
  newId: string;
  note?: string;
}

/**
 * Cấu trúc file public/data/mapping.json
 */
export interface AddressMapping {
  provinces: MappingItem[];
  districts: MappingItem[];
  wards: MappingItem[];
}
