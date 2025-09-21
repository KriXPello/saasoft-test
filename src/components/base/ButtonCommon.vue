<script setup lang="ts">
import { NButton } from 'naive-ui';

const emit = defineEmits<{
  'click': [event: MouseEvent];
}>();

</script>

<template>
  <div class="button-common">
    <NButton @click="emit('click', $event)">
      <slot></slot>
    </NButton>
  </div>
</template>
