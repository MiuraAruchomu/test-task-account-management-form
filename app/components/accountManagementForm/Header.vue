<script setup>
const accountsStore = useAccountsStore();
</script>

<template>
  <div class="flex items-center">
    <h1 class="font-bold text-3xl text-neutral-800">Учетные записи</h1>
    <button
      class="w-15 h-15 px-3 py-3 ml-5 flex justify-center items-center text-2xl text-gray-500 hover:text-neutral-800 border border-gray-300 hover:border-neutral-800 rounded-lg hover:cursor-pointer duration-200"
      @click="accountsStore.addNewRecord()"
    >
      <Icon name="ix:plus" size="1em" />
    </button>
  </div>
</template>
