import type { ConversionResult } from '../types/address';

export interface CSVRow {
  provinceId: string;
  provinceName?: string;
}

export class CSVParser {
  // Parse CSV text to array of rows
  static parseCSV(csvText: string): CSVRow[] {
    const lines = csvText.trim().split('\n');
    const result: CSVRow[] = [];

    // Skip header if exists
    const startIndex = lines[0].toLowerCase().includes('id') || 
                       lines[0].toLowerCase().includes('mã') ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = line.split(',').map(p => p.trim().replace(/^"|"$/g, ''));
      
      result.push({
        provinceId: parts[0],
        provinceName: parts[1] || undefined,
      });
    }

    return result;
  }

  // Convert results to CSV format
  static resultsToCSV(results: ConversionResult[], direction: 'old-to-new' | 'new-to-old'): string {
    const header = direction === 'old-to-new' 
      ? 'Mã Cũ,Tên Cũ,Mã Mới,Tên Mới,Ghi chú'
      : 'Mã Mới,Tên Mới,Mã Cũ,Tên Cũ,Ghi chú';

    const rows = results.map((r) => {
      const oldId = r.oldAddress?.province?.id ?? '';
      const oldName = r.oldAddress?.province?.name ? `"${r.oldAddress.province.name}"` : '';
      const newId = r.newAddress?.province?.id ?? '';
      const newName = r.newAddress?.province?.name ? `"${r.newAddress.province.name}"` : '';
      const note = `"${r.note ?? ''}"`;

      return direction === 'old-to-new'
        ? `${oldId},${oldName},${newId},${newName},${note}`
        : `${newId},${newName},${oldId},${oldName},${note}`;
    });

    return [header, ...rows].join('\n');
  }

  // Download CSV file
  static downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
