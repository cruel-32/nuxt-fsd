<template>
  <form @submit.prevent="handleJoin">
    <div>
      <label for="username">사용자 이름</label>
      <input id="username" v-model="username" type="text" required />
    </div>
    <div>
      <label for="email">이메일</label>
      <input id="email" v-model="email" type="email" required />
    </div>
    <div>
      <label for="password">비밀번호</label>
      <input id="password" v-model="password" type="password" required />
    </div>
    <div>
      <label for="confirmPassword">비밀번호 확인</label>
      <input
        id="confirmPassword"
        v-model="confirmPassword"
        type="password"
        required
      />
    </div>
    <div v-if="password !== confirmPassword && confirmPassword" class="error">
      비밀번호가 일치하지 않습니다.
    </div>
    <button type="submit" :disabled="password !== confirmPassword">
      가입하기
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleJoin = () => {
  if (password.value !== confirmPassword.value) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }
  console.log('가입 시도:', {
    username: username.value,
    email: email.value,
  });
  // 이곳에 실제 회원가입 API 호출 로직을 구현할 수 있습니다.
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: bold;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.75rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #218838;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 0.875rem;
}
</style>
