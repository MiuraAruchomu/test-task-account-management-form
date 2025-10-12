export interface Itag {
  text: string;
}

export type TAccountType = 'LDAP' | 'local';

export interface IAccount {
  id: number;
  tags: Itag[];
  type: TAccountType;
  login: string | null;
  password: string | null;
}
