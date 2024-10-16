<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NDataTable, NButton, NSpace, NInput, NForm, NFormItem } from 'naive-ui'
import { useOdooApi } from '../composables/useOdooApi'

const { fetchContacts, createContact } = useOdooApi()

const contacts = ref([])
const loading = ref(true)
const showForm = ref(false)
const newContact = ref({ name: '', email: '', phone: '' })

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone' },
]

onMounted(async () => {
  await loadContacts()
})

async function loadContacts() {
  loading.value = true
  contacts.value = await fetchContacts()
  loading.value = false
}

async function handleCreateContact() {
  await createContact(newContact.value)
  newContact.value = { name: '', email: '', phone: '' }
  showForm.value = false
  await loadContacts()
}
</script>

<template>
  <div>
    <h1>Contacts</h1>
    <n-space vertical>
      <n-button @click="showForm = !showForm">{{ showForm ? 'Hide Form' : 'Add Contact' }}</n-button>
      <n-form v-if="showForm" @submit.prevent="handleCreateContact">
        <n-form-item label="Name">
          <n-input v-model:value="newContact.name" />
        </n-form-item>
        <n-form-item label="Email">
          <n-input v-model:value="newContact.email" />
        </n-form-item>
        <n-form-item label="Phone">
          <n-input v-model:value="newContact.phone" />
        </n-form-item>
        <n-button type="primary" attr-type="submit">Create Contact</n-button>
      </n-form>
      <n-data-table :columns="columns" :data="contacts" :loading="loading" />
    </n-space>
  </div>
</template>