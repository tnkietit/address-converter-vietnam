// src/hooks/useAddressMapping.ts
import { useEffect, useState } from "react";
import type { AddressMapping } from "../types/address";

export function useAddressMapping() {
  const [mapping, setMapping] = useState<AddressMapping | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/data/mapping.json");
        if (!res.ok) throw new Error("Không tải được mapping.json");
        const data: AddressMapping = await res.json();
        setMapping(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { mapping, loading, error };
}
