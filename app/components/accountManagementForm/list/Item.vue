<script setup>
import { RECORD_TYPES } from '~/constants/recordTypes';

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
});

const accountsStore = useAccountsStore();
const localState = ref({ ...props.data });
const localTags = ref([...props.data.tags].map((tag) => tag.text).join(';'));

const errors = reactive({
  tags: '',
  login: '',
  password: '',
});

const validateAll = () => {
  errors.tags = validateTags(localTags.value);
  errors.login = validateLogin(localState.value.login);
  if (localState.value.type === RECORD_TYPES.LOCAL) {
    errors.password = validatePassword(localState.value.password);
  }
};

const handleChange = () => {
  if (localState.value.type === RECORD_TYPES.LDAP) {
    localState.value.password = null;
    errors.password = false;
  }
  accountsStore.updateTypeOfRecord(localState.value.id, localState.value.type);
};

const handleBlurTags = () => {
  validateAll();
  const hasError = errors.tags;
  if (!hasError) {
    const newTags = localTags.value.split(';').map((tag) => {
      return { text: tag.trim() };
    });
    localState.value.tags = newTags;
    accountsStore.updateTagsOfRecord(localState.value.id, newTags);
  }
};

const handleBlur = () => {
  validateAll();
  const hasError = Object.values(errors).some(Boolean);
  if (!hasError) {
    accountsStore.updateRecord(localState.value.id, { ...localState.value });
  }
};
</script>

<template>
  <li class="my-3 grid grid-cols-[24%_15%_24%_24%_5%] gap-[2%]">
    <UiInput v-model="localTags" :error="errors.tags" @blur="handleBlurTags" />
    <label class="relative h-fit">
      <select
        v-model="localState.type"
        name="type"
        class="px-2 py-1 w-full h-full border border-gray-300 rounded-lg cursor-pointer outline-none appearance-none"
        @change="handleChange"
      >
        <option v-for="(value, key) in RECORD_TYPES" :key="key" :value="value">
          {{ value }}
        </option>
      </select>
      <Icon
        name="ix:chevron-down-small"
        size="1.5em"
        class="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
      />
    </label>
    <UiInput
      v-model="localState.login"
      :error="errors.login"
      :class="{ 'col-span-2': localState.type === RECORD_TYPES.LDAP }"
      @blur="handleBlur"
    />
    <UiInput
      v-if="localState.type === RECORD_TYPES.LOCAL"
      v-model="localState.password"
      :error="errors.password"
      type="password"
      @blur="handleBlur"
    />
    <span
      class="flex justify-center items-center"
      @click="accountsStore.removeRecord(data.id)"
    >
      <Icon
        name="ix:trashcan"
        size="1.5em"
        class="text-gray-500 hover:text-neutral-800 duration-200 cursor-pointer"
      />
    </span>
  </li>
</template>
