<script setup lang="ts">
import { ref } from 'vue';
import { NAlert } from 'naive-ui';
import { useAccountsStore } from '~/stores/accounts';
import AccountList from '~/components/AccountList.vue';
import { ButtonCommon } from '~/components/base';
import { AccountType, type IAccount, type IAccountListItemData, type IAccountListSaveData } from '~/interfaces';

const accountsStore = useAccountsStore();

const localAccounts = ref(
  accountsStore.accounts.map<IAccountListItemData>(x => {
    return {
      accountType: x.accountType,
      id: x.id,
      labelsRaw: x.labels.map(x => x.text).join(';'),
      login: x.login,
      password: x.password,
    };
  })
);

const handleCreateAccount = () => {
  localAccounts.value.push({
    id: `${Date.now()}_${Math.random()}`,
    accountType: AccountType.LDAP,
    labelsRaw: '',
    login: '',
    password: null,
  });
};

const handleSaveItem = (data: IAccountListSaveData) => {
  const { item, } = data;
  const labels = item.labelsRaw
    .split(';')
    .map(x => ({ text: x.trim() }));
  const account: IAccount = {
    id: item.id,
    accountType: item.accountType,
    labels,
    login: item.login,
    password: item.password,
  }
  accountsStore.save(account, data.index);
};

const handleDeleteItem = (item: IAccountListItemData) => {
  // TODO: возможно стоит добавить подтверждение удаления?
  accountsStore.remove(item.id);
  localAccounts.value = localAccounts.value.filter(x => x.id != item.id);
}

</script>

<template>
  <div class="main-content">
    <div class="control-panel">
      <div class="control-panel__row">
        <p class="control-panel__title">Учетные записи</p>
        <ButtonCommon @click="handleCreateAccount">
          <div class="i-mdi-plus size-4 color-black"></div>
        </ButtonCommon>
      </div>

      <NAlert
        class="mt-4"
        title="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
      >
        <template #icon>
          <div class="i-mdi-question-mark size-4 color-black"></div>
        </template>
      </NAlert>
    </div>

    <AccountList
      class="grow mt-6"
      :model="localAccounts"
      @save-item="handleSaveItem"
      @delete-item="handleDeleteItem" />
  </div>
</template>

<style scoped>
.main-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.control-panel {
  padding: 0 16px;
  padding-top: 16px;
}

.control-panel__title {
  font-size: 1.4em;
  font-weight: bold;
}

.control-panel__row {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
