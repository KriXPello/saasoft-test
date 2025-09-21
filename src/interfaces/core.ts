export enum AccountType {
  Local,
  LDAP,
}

export type IAccountLabel = {
  text: string;
}

export type IAccount = {
  id: string;
  accountType: AccountType;
  login: string;
  password: string | null;
  labels: IAccountLabel[];
};
