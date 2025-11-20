import type { UseFetchOptions } from '#app';
import type { MaybeRef } from 'vue';

export interface FetchCommentsQuery {
  parentId: string; // 댓글이 달린 부모의 ID (여기서는 메인 페이지 쿼리 조합)
  page: number;
}

export const useFetchComments = <T = any>(
  query: MaybeRef<FetchCommentsQuery>,
  options: UseFetchOptions<T> = {},
) => {
  return useFetch<T>('http://localhost:3001/comments', {
    ...options,
    method: 'GET',
    query,
  });
};
