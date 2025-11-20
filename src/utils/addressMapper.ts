import { Province, FullAddress, AddressMapping, MappingItem } from "../types/address";



export class AddressMapper {
  private provincesOld: Province[];
  private provincesNew: Province[];
  private mapping: MappingData;

  constructor(
    provincesOld: Province[],
    provincesNew: Province[],
    mapping: MappingData
  ) {
    this.provincesOld = provincesOld;
    this.provincesNew = provincesNew;
    this.mapping = mapping;
  }

  // Convert old address to new address
  convertOldToNew(oldProvinceId: string): ConversionResult | null {
    const provinceMapping = this.mapping.provinces.find((m) =>
      m.oldIds.includes(oldProvinceId)
    );

    if (!provinceMapping) {
      const oldProvince = this.provincesOld.find((p) => p.id === oldProvinceId);
      const newProvince = this.provincesNew.find((p) => p.id === oldProvinceId);

      if (oldProvince && newProvince) {
        return {
          success: true,
          oldAddress: { province: oldProvince },
          newAddress: { province: newProvince },
          note: 'Không có thay đổi',
        };
      }
      return null;
    }

    const oldProvince = this.provincesOld.find((p) => p.id === oldProvinceId);
    const newProvince = this.provincesNew.find((p) => p.id === provinceMapping.newId);

    if (!oldProvince || !newProvince) return null;

    return {
      success: true,
      oldAddress: { province: oldProvince },
      newAddress: { province: newProvince },
      note: provinceMapping.note || '',
    };
  }

  // Convert new address to old address(es)
  convertNewToOld(newProvinceId: string): ConversionResult[] {
    const provinceMapping = this.mapping.provinces.find((m) => m.newId === newProvinceId);

    if (!provinceMapping) {
      const oldProvince = this.provincesOld.find((p) => p.id === newProvinceId);
      const newProvince = this.provincesNew.find((p) => p.id === newProvinceId);

      if (oldProvince && newProvince) {
        return [
          {
            success: true,
            oldAddress: { province: oldProvince },
            newAddress: { province: newProvince },
            note: 'Không có thay đổi',
          },
        ];
      }
      return [];
    }

    const newProvince = this.provincesNew.find((p) => p.id === newProvinceId);
    if (!newProvince) return [];

    return provinceMapping.oldIds
      .map((oldId) => {
        const oldProvince = this.provincesOld.find((p) => p.id === oldId);
        if (!oldProvince) return null;

        return {
          success: true,
          oldAddress: { province: oldProvince },
          newAddress: { province: newProvince },
          note: provinceMapping.note || '',
        };
      })
      .filter(Boolean) as ConversionResult[];
  }

  searchProvinces(query: string, isOld: boolean): Province[] {
    const provinces = isOld ? this.provincesOld : this.provincesNew;
    const normalizedQuery = query.toLowerCase().trim();

    return provinces.filter(
      (p) =>
        p.name.toLowerCase().includes(normalizedQuery) ||
        p.code.toLowerCase().includes(normalizedQuery)
    );
  }

  getAllProvinces(isOld: boolean): Province[] {
    return isOld ? this.provincesOld : this.provincesNew;
  }
}
