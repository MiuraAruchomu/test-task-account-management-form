import { defineStore } from 'pinia';
import { RECORD_TYPES } from '~/constants/recordTypes';
import type {
  IAccount,
  Itag,
  TAccountType,
} from '~/types/stores/accounts-store';

export const useAccountsStore = defineStore('accounts-store', () => {
  const accounts = ref<IAccount[]>([]);

  function addNewRecord() {
    const newId = Math.round(Math.random() * 100000);
    const newRecord: IAccount = {
      id: newId,
      tags: [],
      type: RECORD_TYPES.LDAP,
      login: '',
      password: '',
    };
    accounts.value.push(newRecord);
  }

  function removeRecord(id: number) {
    const index = accounts.value.findIndex((rec) => rec.id === id);
    if (index >= 0) {
      accounts.value.splice(index, 1);
    }
  }

  function updateRecord(id: number, value: IAccount) {
    const index = accounts.value.findIndex((rec) => rec.id === id);
    if (index >= 0) {
      accounts.value[index] = value;
    }
  }

  function updateTagsOfRecord(id: number, value: Itag[]) {
    const index = accounts.value.findIndex((rec) => rec.id === id);
    const rec = accounts.value[index];
    if (rec) {
      rec.tags = value;
    }
  }

  function updateTypeOfRecord(id: number, value: TAccountType) {
    const index = accounts.value.findIndex((rec) => rec.id === id);
    const rec = accounts.value[index];
    if (rec) {
      rec.type = value;
      if (rec.type === RECORD_TYPES.LOCAL && value === RECORD_TYPES.LDAP) {
        rec.password = null;
      } else if (
        rec.type === RECORD_TYPES.LDAP &&
        value === RECORD_TYPES.LOCAL
      ) {
        rec.password = '';
      }
    }
  }

  onMounted(() => {
    const cache = localStorage.getItem('accounts');
    if (cache) {
      accounts.value = JSON.parse(cache);
    }
  });

  watch(
    accounts,
    (newAccounts) => {
      localStorage.setItem('accounts', JSON.stringify(newAccounts));
    },
    { deep: true },
  );

  return {
    accounts,
    addNewRecord,
    removeRecord,
    updateRecord,
    updateTagsOfRecord,
    updateTypeOfRecord,
  };
});
