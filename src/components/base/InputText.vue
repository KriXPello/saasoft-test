<script setup lang="ts">
import { NInput } from 'naive-ui';

const p = defineProps<{
  maxLength?: number;
  placeholder?: string;
  error?: boolean;
  /** @default 'text' */
  type?: 'text' | 'password' | 'textarea';
}>()

const emit = defineEmits<{
  'blur': [];
}>()

const valueBind = defineModel<any>('value');

</script>

<template>
  <div class="input-text">
    <NInput
      class="w-full"
      v-model:value="valueBind"
      rows="1"
      :autosize="{ minRows: 1, maxRows: 4 }"
      :status="error ? 'error' : undefined"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :type="type"
      :resizable="false"
      show-password-on="click"
      @blur="emit('blur')"
    />
  </div>
</template>
