// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nuxt 4 Example',
      meta: [{ name: 'description', content: 'Nuxt 4 Example' }],
    },
  },
  pages: true, // 페이지 기반 라우팅 활성화
  runtimeConfig: {
    // 서버 측에서만 사용할 수 있는 비공개 키
    apiSecret: '@9r8&6vFj#n^7*!9@0f0#$',
    // public 내의 키는 클라이언트 측에도 노출됩니다
    public: {
      apiBase: '/api',
    },
  },
  // ssr: false // SPA 모드로 설정
  // `modules`: Nuxt의 핵심 기능을 확장하는 모듈들을 추가합니다. (예: @nuxtjs/tailwindcss, @pinia/nuxt)
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/scripts',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@pinia/nuxt',
  ],
  // `css`: 전역으로 적용할 CSS 파일을 등록합니다.
  // css: [
  // '~/assets/css/main.css'
  // ],
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15', // Nuxt 4 compatibility date
  // `nitro`: Nuxt의 서버 엔진인 Nitro에 대한 설정을 합니다. 서버 API, 미들웨어 등을 확장할 수 있습니다.
  // nitro: {
  //   preset: 'node-server' // 배포 환경 프리셋 설정
  // },
  alias: {
    '@/': './src',
  },

  // FSD public api 자동 import 설정
  imports: {
    dirs: [
      // 각 feature 디렉토리의 index.ts 파일을 스캔하여 export된 모듈을 자동 import 합니다.
      'src/**/*',
    ],
  },
  // $production: {
  //   routeRules: {
  //     '/**': { isr: true }, // 모든 라우트에 대해 ISR(증분 정적 재생성) 활성화
  //   },
  // },
  // 개발 환경
  // $development: {
  // },
  // 환경 변수별 설정
  // $env: {
  //   staging: {
  //   },
  // },
});
