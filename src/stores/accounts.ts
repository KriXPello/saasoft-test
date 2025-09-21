import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import type { IAccount } from '~/interfaces';

export const useAccountsStore = defineStore('accounts', () => {
  const savedAccounts = useLocalStorage<IAccount[]>(
    'accounts',
    [],
    { deep: false },
  );

  const accounts = computed(() => savedAccounts.value);

  const save = (account: IAccount, visibleIndex: number) => {
    const savedIndex = savedAccounts.value.findIndex(x => x.id == account.id);
    const listCopy = savedAccounts.value.slice();
    if (savedIndex >= 0) {
      listCopy[savedIndex] = account;
    } else {
      /** Без этого если пользователь создаст несколько пустых записей
       * и начнет заполнять их в хаотичном порядке, при перезагрузке страницы
       * они окажутся в порядке заполнения, а не создания */
      listCopy.splice(visibleIndex, 0, account);
    }
    savedAccounts.value = listCopy;
  };

  const remove = (id: string) => {
    savedAccounts.value = savedAccounts.value.filter(x => x.id != id);
  }

  return {
    accounts,
    save,
    remove,
  };
});
