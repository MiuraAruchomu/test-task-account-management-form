import type { RECORD_TYPES } from '~/constants/recordTypes';

export interface Itag {
  text: string;
}

export type TAccountType = (typeof RECORD_TYPES)[keyof typeof RECORD_TYPES];

export interface IAccount {
  id: number;
  tags: Itag[];
  type: TAccountType;
  login: string | null;
  password: string | null;
}
