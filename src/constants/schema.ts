import { AccountType } from "~/interfaces";

export const ACCOUNT_SCHEMA = {
  labels: {
    maxLen: 50,
  },
  accountType: {
    allowedValues: [AccountType.Local, AccountType.LDAP],
  },
  login: {
    maxLen: 100,
  },
  password: {
    maxLen: 100,
  },
};
