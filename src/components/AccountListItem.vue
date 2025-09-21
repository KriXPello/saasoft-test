<script setup lang="ts">
import { computed, h, ref } from 'vue';
import { ACCOUNT_SCHEMA } from '~/constants';
import { AccountType, type IAccountListItemData, type ISelectOption } from '~/interfaces';
import { ButtonCommon, InputText, SelectSingle } from '~/components/base';

const p = defineProps<{
  data: IAccountListItemData;
}>();

const emit = defineEmits<{
  'valid': [];
  'delete': [];
}>();

const showPassword = computed(() => p.data.accountType == AccountType.Local);

type IValidateKeys = 'labels' | 'login' | 'accountType' | 'password';

/** true - invalid */
type IValidationErrors = Partial<Record<IValidateKeys, boolean>>;

const shownErrors = ref<IValidationErrors>({});

const validators: Record<IValidateKeys, (data: IAccountListItemData) => boolean> = {
  'labels': ({ labelsRaw }) => labelsRaw.length <= ACCOUNT_SCHEMA.labels.maxLen,
  'login': ({ login }) => !!login && login.length <= ACCOUNT_SCHEMA.login.maxLen,
  'accountType': ({ accountType }) => ACCOUNT_SCHEMA.accountType.allowedValues.includes(accountType),
  'password': ({ password }) => {
    if (!showPassword.value) return true;
    return !!password && password.length <= ACCOUNT_SCHEMA.password.maxLen;
  },
};

const processChange = (trigger: IValidateKeys) => {
  const { data } = p;
  let isFormValid = true;
  for (const [field, validator] of Object.entries(validators)) {
    const isFieldValid = validator(data);
    if (!isFieldValid) {
      isFormValid = false;
    }
    if (trigger == field) {
      shownErrors.value[field] = !isFieldValid;
    }
  }
  if (isFormValid) {
    emit('valid');
  }
};

const accountTypeOptions: ISelectOption<AccountType>[] = [
  { label: 'LDAP', value: AccountType.LDAP },
  { label: 'Локальная', value: AccountType.Local },
];

const handleSelectAccountType = (value: AccountType) => {
  p.data.accountType = value;
  if (value == AccountType.LDAP) {
    p.data.password = null;
    shownErrors.value.password = false;
  }
  processChange('accountType');
};

</script>

<template>
  <div class="label">
    <InputText
      placeholder="Значение"
      type="textarea"
      :max-length="ACCOUNT_SCHEMA.labels.maxLen"
      :error="shownErrors.labels"
      v-model:value="p.data.labelsRaw"
      @blur="processChange('labels')" />
  </div>

  <div class="type">
    <SelectSingle
      :options="accountTypeOptions"
      :selected="p.data.accountType"
      :error="shownErrors.accountType"
      @select="handleSelectAccountType($event.value)" />
  </div>

  <div class="login" :class="{ expanded: !showPassword }">
    <InputText
      placeholder="Значение"
      :max-length="ACCOUNT_SCHEMA.login.maxLen"
      :error="shownErrors.login"
      v-model:value="p.data.login"
      @blur="processChange('login')" />
  </div>

  <div class="password" v-if="showPassword">
    <InputText
      placeholder="Значение"
      type="password"
      :max-length="ACCOUNT_SCHEMA.password.maxLen"
      :error="shownErrors.password"
      v-model:value="p.data.password"
      @blur="processChange('password')" />
  </div>

  <div class="delete">
    <ButtonCommon @click="emit('delete')">
      <div class="i-mdi-trash"></div>
    </ButtonCommon>
  </div>
</template>

<style scoped>
.login.expanded {
  grid-column: span 2;
}
</style>
