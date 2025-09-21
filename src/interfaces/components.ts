import type { AccountType } from "./core";


export type IAccountListItemData = {
  id: string;
  accountType: AccountType;
  login: string;
  password: string | null;
  labelsRaw: string;
}

export type IAccountListSaveData = {
  item: IAccountListItemData;
  index: number;
}

export type ISelectOption<T = any> = {
  label: string;
  value: T;
}
