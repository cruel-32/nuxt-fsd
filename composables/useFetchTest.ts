import type { UseFetchOptions } from '#app';
import type { MaybeRef } from 'vue';

export interface FetchTestQuery {
  page: number;
  order: string;
  date: string;
}

export const useFetchTest = <ResT = unknown>(
  query: MaybeRef<FetchTestQuery>,
  options?: Pick<
    UseFetchOptions<ResT>,
    'key' | 'server' | 'lazy' | 'immediate' | 'deep' | 'dedupe' | 'watch'
  >,
) => {
  return useFetch<ResT>('http://localhost:3001', { ...options, query });
};
