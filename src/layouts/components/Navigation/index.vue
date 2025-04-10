<script setup lang="ts">
import NotificationDropDown from './NotificationDropDown.vue'
import ProfileDropDown from './ProfileDropDown.vue'
import SearchCommand from './SearchCommand.vue'
import SettingsDropDown from './SettingsDropDown.vue'
</script>

<template>
  <div class="flex items-center border-1 border-b px-4 py-2">
    <SearchCommand />

    <div class="ml-auto flex items-center gap-2">
      <NotificationDropDown />
      <SettingsDropDown />
      <ProfileDropDown />
    </div>
  </div>
</template>
