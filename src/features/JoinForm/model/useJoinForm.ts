import { ref, computed } from 'vue';

// FSD: 이 Composable은 JoinForm 기능의 비즈니스 로직을 담당합니다.
export function useJoinForm() {
  // --- 상태 (State) ---
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // --- 파생된 상태 (Computed) ---

  // 비밀번호 일치 여부 검사
  const isPasswordMismatch = computed(() => {
    return (
      password.value &&
      confirmPassword.value &&
      password.value !== confirmPassword.value
    );
  });

  // 제출 가능 여부 검사
  const canSubmit = computed(() => {
    return (
      username.value &&
      email.value &&
      password.value &&
      !isPasswordMismatch.value
    );
  });

  // --- 액션 (Actions) ---

  // 회원가입 제출 함수
  const submitJoin = async () => {
    if (!canSubmit.value) {
      error.value = '폼의 모든 필드를 올바르게 입력해주세요.';
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      // API 호출을 시뮬레이션합니다.
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 테스트를 위해 특정 이메일일 경우 에러를 발생시킵니다.
          if (email.value === 'error@test.com') {
            reject(new Error('이미 사용 중인 이메일입니다.'));
          } else {
            resolve({ success: true });
          }
        }, 1500);
      });

      console.log('회원가입 성공!', {
        username: username.value,
        email: email.value,
      });

      // 성공 후 폼 초기화 또는 페이지 리디렉션 등을 수행할 수 있습니다.
      username.value = '';
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
    } catch (e: any) {
      error.value = e.message || '알 수 없는 에러가 발생했습니다.';
    } finally {
      isLoading.value = false;
    }
  };

  // 이 Composable의 공개 API
  return {
    username,
    email,
    password,
    confirmPassword,
    isLoading,
    error,
    isPasswordMismatch,
    canSubmit,
    submitJoin,
  };
}
