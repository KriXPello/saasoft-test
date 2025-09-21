<script setup lang="ts" generic="TOption extends ISelectOption">
import type { ISelectOption } from '~/interfaces';
import { NSelect, type SelectOption } from 'naive-ui';
import { computed } from 'vue';

const p = defineProps<{
  options: TOption[];
  selected: TOption['value'] | null | undefined;
  error?: boolean;
}>();

const emit = defineEmits<{
  'select': [option: TOption];
}>();

const handleUpdateValue = (value: any) => {
  const option = p.options.find(x => x.value == value);
  if (option) {
    emit('select', option);
  }
};

const list = computed(() => p.options.map<SelectOption>((x) => {
  return {
    label: x.label,
    value: x.value,
  };
}));

</script>

<template>
  <div class="select-single">
    <NSelect
      :value="selected"
      :options="list"
      :consistent-menu-width="false"
      :show-checkmark="false"
      :status="error ? 'error' : undefined"
      @update:value="handleUpdateValue" />
  </div>
</template>
