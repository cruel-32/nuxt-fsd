<template>
  <form @submit.prevent="handleLogin">
    <div>
      <label for="email">이메일</label>
      <input id="email" v-model="email" type="email" required />
    </div>
    <div>
      <label for="password">비밀번호</label>
      <input id="password" v-model="password" type="password" required />
    </div>
    <button type="submit">로그인</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = () => {
  console.log('로그인 시도:', {
    email: email.value,
    password: password.value,
  });
  // 이곳에 실제 로그인 API 호출 로직을 구현할 수 있습니다.
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #0056b3;
}
</style>