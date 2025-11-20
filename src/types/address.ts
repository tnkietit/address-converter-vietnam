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
  province?: Province;
  district?: District | null;
  ward?: Ward | null;
  street?: string;
}

/**
 * Kết quả chuyển đổi
 */
export interface ConversionResult {
  success: boolean;
  oldAddress?: FullAddress;
  newAddress?: FullAddress;
  note?: string;
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

/**
 * Alias cho AddressMapping (dùng trong AddressMapper)
 */
export type MappingData = AddressMapping;

/**
 * Interface cho ResultCard props
 */
export interface ResultCardProps {
  result: ConversionResult;
  direction: 'old-to-new' | 'new-to-old';
}
