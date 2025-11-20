<template>
  <div>
    <h1>Join</h1>
    <NuxtLink to="/">Home</NuxtLink>
    <JoinForm />
  </div>
</template>

<script setup lang="ts">
// auto-import를 포기하고 FSD를 취한다. 장기적으로 봤을때 auto-import의 매력은 그리 크지 않은 것 같다.
import { JoinForm } from '@/src/features/JoinForm/index';

const {
  username,
  email,
  password,
  confirmPassword,
  isLoading,
  error,
  isPasswordMismatch,
  canSubmit,
  submitJoin,
} = useJoinForm();
</script>
