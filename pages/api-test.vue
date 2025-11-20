<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { t, locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

// 언어 변경 시 URL 라우팅
const changeLanguage = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value as 'en' | 'ko';
  const path = switchLocalePath(newLocale);
  router.push(path);
};

// URL 쿼리 파라미터로부터 현재 상태 도출 (computed)
const currentQuery = computed<FetchTestQuery>(() => {
  const pageParam = route.query.page;
  const orderParam = route.query.order;
  const dateParam = route.query.date;

  return {
    page: Number(pageParam) || 1,
    order: typeof orderParam === 'string' ? orderParam : 'desc',
    date:
      typeof dateParam === 'string'
        ? dateParam
        : new Date().toISOString().slice(0, 10),
  };
});

// currentQuery(computed)가 변경되면 useFetch가 자동으로 재요청을 보냄
const { data, error, pending } = useFetchTest(currentQuery);

// --- 댓글 관련 로직 ---
const commentPage = ref(1);

// 메인 쿼리가 변경되면 댓글 페이지를 1로 초기화
watch(
  currentQuery,
  () => {
    commentPage.value = 1;
  },
  { deep: true },
);

// 댓글 쿼리 생성 (메인 쿼리 + 댓글 페이지)
const commentQuery = computed<FetchCommentsQuery>(() => ({
  parentId: JSON.stringify(currentQuery.value), // 부모 ID 대신 현재 쿼리 조합을 ID로 사용
  page: commentPage.value,
}));

const {
  data: commentsData,
  error: commentsError,
  pending: commentsPending,
} = await useFetchComments(commentQuery);

const changeCommentPage = (page: number) => {
  commentPage.value = page;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">{{ t('api_test') }}</h1>
        <select
          :value="locale"
          @change="changeLanguage"
          class="border border-gray-300 rounded-md p-2 text-gray-700"
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
        </select>
      </div>

      <div class="mb-8">
        <h2 class="text-lg font-semibold text-gray-700 mb-3">
          {{ t('page_selection') }}
        </h2>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="p in 10"
            :key="p"
            :to="
              localePath({
                path: route.path,
                query: {
                  ...route.query,
                  page: p,
                  order: route.query.order || 'desc',
                  date:
                    route.query.date || new Date().toISOString().slice(0, 10),
                },
              })
            "
            class="px-4 py-2 rounded-lg font-medium transition-all duration-200"
            :class="[
              currentQuery.page === p
                ? 'bg-blue-600 text-white shadow-md transform scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            {{ p }}
          </NuxtLink>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3
            class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2"
          >
            {{ t('current_query') }}
          </h3>
          <pre class="text-sm text-gray-800 overflow-auto">{{
            currentQuery
          }}</pre>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3
            class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2"
          >
            {{ t('api_response') }}
          </h3>
          <div v-if="pending" class="text-gray-500 animate-pulse">
            {{ t('loading') }}
          </div>
          <div v-else-if="error" class="text-red-500">
            {{ t('error') }}: {{ error.message }}
          </div>
          <pre v-else class="text-sm text-gray-800 overflow-auto max-h-60">{{
            data
          }}</pre>
        </div>
      </div>

      <!-- 댓글 섹션 -->
      <div class="border-t pt-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          {{ t('comments') }}
        </h2>

        <div class="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-semibold text-gray-700">
              {{ t('comments_page') }}: {{ commentPage }}
            </h3>
            <div class="flex gap-2">
              <button
                v-for="p in 5"
                :key="p"
                @click="changeCommentPage(p)"
                class="px-3 py-1 rounded text-sm font-medium transition-colors"
                :class="[
                  commentPage === p
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-600 border hover:bg-gray-100',
                ]"
              >
                {{ p }}
              </button>
            </div>
          </div>

          <div v-if="commentsPending" class="text-gray-500 animate-pulse py-4">
            {{ t('loading_comments') }}
          </div>
          <div v-else-if="commentsError" class="text-red-500 py-4">
            {{ t('error_loading_comments') }}: {{ commentsError.message }}
          </div>
          <div v-else class="space-y-4">
            <pre class="text-sm text-gray-800 overflow-auto max-h-60">{{
              commentsData
            }}</pre>
          </div>
        </div>

        <div class="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
          <p>
            <strong>{{ t('debug_info') }}:</strong> {{ t('debug_desc') }}
          </p>
          <pre class="mt-2 overflow-auto">{{ commentQuery }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
