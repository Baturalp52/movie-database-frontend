'use client';

import { BaseResponse, PaginationMeta } from '@/services/base.service';
import { useCallback, useEffect, useState } from 'react';

export default function useFetch<T>(fetchFn: () => Promise<BaseResponse<T>>) {
  const [data, setData] = useState<T | undefined | null>(null);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    const data = await fetchFn();
    if (data.success) {
      setData(data.data);
      if (data.meta) {
        setMeta(data.meta);
      }
    } else {
      setError(data.errorMessage ?? '');
    }

    setLoading(false);
  }, [fetchFn]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, meta, error, loading, refetch };
}
