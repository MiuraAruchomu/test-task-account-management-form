<script setup>
const props = defineProps({
  error: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: 'Значение',
  },
});

const model = defineModel();
const emit = defineEmits('blur');
const isFocused = ref(false);
const isPasswordVisible = ref(false);

const inputType = computed(() =>
  props.type === 'password'
    ? isPasswordVisible.value
      ? 'text'
      : 'password'
    : props.type,
);

const toggleVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<template>
  <label class="relative h-fit" :class="{ 'mb-3': error }">
    <input
      v-model="model"
      :type="inputType"
      class="px-2 py-1 w-full border border-gray-300 rounded-lg outline-none"
      :class="[
        { 'border-neutral-800': isFocused },
        { 'border-red-700 placeholder-red-700': error },
      ]"
      :placeholder="isFocused ? null : placeholder"
      @focus="isFocused = true"
      @blur="
        () => {
          emit('blur');
          isFocused = false;
        }
      "
    />
    <span
      v-if="error"
      class="absolute left-0 top-[105%] text-[10px] text-red-700"
      >{{ props.error }}</span
    >
    <Icon
      v-if="type === 'password'"
      :name="isPasswordVisible ? 'ix:eye' : 'ix:eye-cancelled'"
      size="1.2em"
      class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
      @click="toggleVisibility"
    />
  </label>
</template>
