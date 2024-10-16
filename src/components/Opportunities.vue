<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NDataTable, NButton, NSpace, NInput, NForm, NFormItem, NSelect } from 'naive-ui'
import { useOdooApi } from '../composables/useOdooApi'

const { fetchOpportunities, createOpportunity } = useOdooApi()

const opportunities = ref([])
const loading = ref(true)
const showForm = ref(false)
const newOpportunity = ref({ name: '', amount: 0, stage: 'New' })

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Amount', key: 'amount' },
  { title: 'Stage', key: 'stage' },
]

const stageOptions = [
  { label: 'New', value: 'New' },
  { label: 'Qualified', value: 'Qualified' },
  { label: 'Proposal', value: 'Proposal' },
  { label: 'Won', value: 'Won' },
  { label: 'Lost', value: 'Lost' },
]

onMounted(async () => {
  await loadOpportunities()
})

async function loadOpportunities() {
  loading.value = true
  opportunities.value = await fetchOpportunities()
  loading.value = false
}

async function handleCreateOpportunity() {
  await createOpportunity(newOpportunity.value)
  newOpportunity.value = { name: '', amount: 0, stage: 'New' }
  showForm.value = false
  await loadOpportunities()
}
</script>

<template>
  <div>
    <h1>Opportunities</h1>
    <n-space vertical>
      <n-button @click="showForm = !showForm">{{ showForm ? 'Hide Form' : 'Add Opportunity' }}</n-button>
      <n-form v-if="showForm" @submit.prevent="handleCreateOpportunity">
        <n-form-item label="Name">
          <n-input v-model="newOpportunity.name" />
        </n-form-item>
        <n-form-item label="Amount">
          <n-input v-model="newOpportunity.amount" />
        </n-form-item>
        <n-form-item label="Stage">
          <n-select v-model:value="newOpportunity.stage" :options="stageOptions" />
        </n-form-item>
        <n-button type="primary" attr-type="submit">Create Opportunity</n-button>
      </n-form>
      <n-data-table :columns="columns" :data="opportunities" :loading="loading" />
    </n-space>
  </div>
</template>