<script setup lang="ts">
import type { IAccountListItemData, IAccountListSaveData } from '~/interfaces';
import AccountListItem from './AccountListItem.vue';

const p = defineProps<{
  model: IAccountListItemData[];
}>();

const emit = defineEmits<{
  'saveItem': [value: IAccountListSaveData];
  'deleteItem': [value: IAccountListItemData]
}>();

</script>

<template>
  <div class="account-list">
    <div class="padding-wrapper">
      <div class="account-list__grid">
        <div class="heading">Метки</div>
        <div class="heading">Тип записи</div>
        <div class="heading">Логин</div>
        <div class="heading">Пароль</div>
        <div class="heading">
          <!-- столбец с действием удаления записи -->
        </div>

        <AccountListItem
          v-for="item, index in model"
          :key="item.id"
          :data="item"
          @valid="emit('saveItem', { item, index })"
          @delete="emit('deleteItem', item)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-list {
  overflow: auto;
}

/*
При появлении горизонтальной прокрутке справа отсутствовал паддинг,
это решение исправляет проблему */
.padding-wrapper {
  padding: 0 16px 16px 16px;
  display: inline-block;
}

.account-list__grid {
  width: 100%;
  display: grid;
  grid-template-columns:
    minmax(90px, 4fr)
    minmax(80px, 3fr)
    minmax(90px, 4fr)
    minmax(90px, 4fr)
    min-content;
  gap: 8px;
}

.heading {
  color: rgb(178, 178, 178);
}
</style>
