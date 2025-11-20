import type { UseFetchOptions } from '#app';
import type { MaybeRef } from 'vue';

export interface FetchTestQuery {
  page: number;
  order: string;
  date: string;
}

export const useFetchTest = <T = any>(
  query: MaybeRef<FetchTestQuery>,
  options: UseFetchOptions<T> = {},
) => {
  return useFetch<T>('http://localhost:3001', {
    ...options,
    method: 'GET',
    query,
  });
};
