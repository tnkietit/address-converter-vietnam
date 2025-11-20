import { useState, useEffect } from 'react';
import { AddressMapper } from '../utils/addressMapper';
import type { Province, MappingData } from '../types/address';

interface AddressData {
  provinces: Province[];
  districts: any[];
  wards: any[];
}

export function useAddressMapping() {
  const [mapper, setMapper] = useState<AddressMapper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // Load all data files
        const [oldData, newData, mappingData] = await Promise.all([
          fetch('/data/provinces-old.json').then(r => r.json()),
          fetch('/data/provinces-new.json').then(r => r.json()),
          fetch('/data/mapping.json').then(r => r.json()),
        ]) as [AddressData, AddressData, MappingData];

        // Create mapper instance
        const addressMapper = new AddressMapper(
          oldData.provinces,
          newData.provinces,
          mappingData
        );

        setMapper(addressMapper);
        setError(null);
      } catch (err) {
        setError('Không thể tải dữ liệu. Vui lòng thử lại.');
        console.error('Error loading address data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { mapper, loading, error };
}
