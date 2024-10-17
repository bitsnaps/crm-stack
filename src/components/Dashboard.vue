<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NCard, NStatistic, NSpace } from 'naive-ui'
import { useOdooApi } from '../composables/useOdooApi'

const { fetchDashboardData } = useOdooApi()

const totalContacts = ref<number>(0)
const totalOpportunities = ref<number>(0)
const totalRevenue = ref<number>(0)

onMounted(async () => {
  const dashboardData = await fetchDashboardData()
  console.log(dashboardData);
  totalContacts.value = dashboardData.totalContacts
  totalOpportunities.value = dashboardData.totalOpportunities
  totalRevenue.value = dashboardData.totalRevenue
})
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <n-space justify="space-around">
      <n-card>
        <n-statistic label="Total Contacts" :value="totalContacts" />
      </n-card>
      <n-card>
        <n-statistic label="Total Opportunities" :value="totalOpportunities" />
      </n-card>
      <n-card>
        <n-statistic label="Total Revenue" :value="totalRevenue" prefix="$" />
      </n-card>
    </n-space>
  </div>
</template>