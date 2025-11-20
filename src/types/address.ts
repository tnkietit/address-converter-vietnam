// src/types/address.ts

export interface Province {
  id: string;
  name: string;
  code?: string;
}

export interface District {
  id: string;
  name: string;
  provinceId: string;
}

export interface Ward {
  id: string;
  name: string;
  districtId: string;
}

/**
 * Địa chỉ đầy đủ (dùng khi convert string → object)
 * Có thêm id/name để dùng chung cho CSV export
 */
export interface FullAddress {
  id?: string;
  name?: string;

  province?: Province;
  district?: District | null;
  ward?: Ward | null;

  street?: string;
}

/**
 * Cấu trúc mapping.json trong public/data/mapping.json
 */
export interface MappingItem {
  oldIds: string[];
  newId: string;
  note?: string;
}

export interface AddressMapping {
  provinces: MappingItem[];
  districts: MappingItem[];
  wards: MappingItem[];
}
