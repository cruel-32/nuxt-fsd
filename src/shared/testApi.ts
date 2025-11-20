import { z } from 'zod';

export const testSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export const validate = (body: any) => {
  return testSchema.safeParse(body);
};

export const POST = async (url: string, body: any) => {
  return await useAsyncData(
    'test',
    async () =>
      $fetch(url, {
        method: 'POST',
        body,
      }),
    {
      immediate: false,
    },
  );
};

export const testApi = async (body: any) => {
  return await POST('https://jsonplaceholder.typicode.com/posts/1', body);
};
