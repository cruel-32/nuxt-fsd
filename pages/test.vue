<script setup lang="ts">
const test = ref({
  name: '',
  email: '',
  password: '',
});

const { data, error, execute } = await testApi(test.value);

const handleSubmit = () => {
  const { success, data: validateData } = validate(test.value);

  if (!success) {
    console.error(validateData?.error.message);
    return;
  }
  execute();
};
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="test.name" />
      <input v-model="test.email" />
      <input type="password" v-model="test.password" />
      <button type="submit">Submit</button>
    </form>
    <div>
      <pre>{{ data }}</pre>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>
