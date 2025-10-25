import { ref, reactive } from 'vue';
import { useAccountsStore } from '@/stores/accounts';
import {
  validateTags,
  validateLogin,
  validatePassword,
} from '@/utils/form-validation';
import { RECORD_TYPES } from '~/constants/recordTypes';
import type { IAccount } from '~/types/stores/accounts-store';

export function useRecordUpdater(initialState: IAccount) {
  const accountsStore = useAccountsStore();

  const localState = ref({ ...initialState });
  const localTags = ref(initialState.tags.map((tag) => tag.text).join(';'));

  const errors = reactive({ tags: '', login: '', password: '' });

  const validateAll = () => {
    errors.tags = validateTags(localTags.value);
    if (typeof localState.value.login === 'string') {
      errors.login = validateLogin(localState.value.login);
    }
    if (
      localState.value.type === RECORD_TYPES.LOCAL &&
      typeof localState.value.password === 'string'
    ) {
      errors.password = validatePassword(localState.value.password);
    }
  };

  const updateTags = () => {
    validateAll();
    if (!errors.tags) {
      const newTags = localTags.value
        .split(';')
        .map((tag) => ({ text: tag.trim() }));
      localState.value.tags = newTags;
      accountsStore.updateTagsOfRecord(localState.value.id, newTags);
    }
  };

  const updateRecord = () => {
    validateAll();
    if (!Object.values(errors).some(Boolean)) {
      accountsStore.updateRecord(localState.value.id, { ...localState.value });
    }
  };

  const changeType = () => {
    if (localState.value.type === RECORD_TYPES.LDAP) {
      localState.value.password = null;
      errors.password = '';
    }
    accountsStore.updateTypeOfRecord(
      localState.value.id,
      localState.value.type,
    );
  };

  const removeRecord = (id: number) => {
    accountsStore.removeRecord(id);
  };

  return {
    localState,
    localTags,
    errors,
    updateTags,
    updateRecord,
    changeType,
    removeRecord,
  };
}
