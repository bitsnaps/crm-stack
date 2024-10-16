<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NDialogProvider, NNotificationProvider, NLayout, NLayoutSider, NMenu, NLayoutHeader, NLayoutContent } from 'naive-ui'
import { h, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const menuOptions = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => 'Dashboard' }),
    key: 'dashboard',
    icon: () => h('i', { class: 'fas fa-tachometer-alt' })
  },
  {
    label: () => h(RouterLink, { to: '/contacts' }, { default: () => 'Contacts' }),
    key: 'contacts',
    icon: () => h('i', { class: 'fas fa-address-book' })
  },
  {
    label: () => h(RouterLink, { to: '/opportunities' }, { default: () => 'Opportunities' }),
    key: 'opportunities',
    icon: () => h('i', { class: 'fas fa-chart-line' })
  }
]

const activeKey = ref('dashboard')
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-layout>
            <n-layout-sider bordered>
              <n-menu :options="menuOptions" v-model:value="activeKey" />
            </n-layout-sider>
            <n-layout>
              <n-layout-header bordered>CRM Web App</n-layout-header>
              <n-layout-content content-style="padding: 24px;">
                <router-view></router-view>
              </n-layout-content>
            </n-layout>
          </n-layout>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  height: 100vh;
}
</style>