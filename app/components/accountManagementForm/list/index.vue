<script setup>
const accountsStore = useAccountsStore();
const { accounts } = storeToRefs(accountsStore);
</script>

<template>
  <div class="grid grid-cols-[24%_15%_24%_24%_5%] gap-[2%] text-gray-400">
    <span>Метки</span>
    <span>Тип записи</span>
    <span>Логин</span>
    <span>Пароль</span>
  </div>
  <ul>
    <AccountManagementFormListItem
      v-for="item in accounts"
      :key="item.id"
      :data="item"
    />
  </ul>
</template>
