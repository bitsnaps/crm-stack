import { ref } from 'vue'
import axios from 'axios'

const API_URL = '/.netlify/functions/odoo-api'

export function useOdooApi() {
  const error = ref(null)

  async function fetchDashboardData() {
    try {
      const response = await axios.get(`${API_URL}/dashboard`)
      return response.data
    } catch (err: any) {
      error.value = err
      console.error('Error fetching dashboard data:', err)
      return { totalContacts: 0, totalOpportunities: 0, totalRevenue: 0 }
    }
  }

  async function fetchContacts() {
    try {
      const response = await axios.get(`${API_URL}/contacts`)
      return response.data
    } catch (err: any) {
      error.value = err
      console.error('Error fetching contacts:', err)
      return []
    }
  }

  async function createContact(contact: any) {
    try {
      const response = await axios.post(`${API_URL}/contacts`, contact)
      return response.data
    } catch (err: any) {
      error.value = err
      console.error('Error creating contact:', err)
      throw err
    }
  }

  async function fetchOpportunities() {
    try {
      const response = await axios.get(`${API_URL}/opportunities`)
      return response.data
    } catch (err: any) {
      error.value = err
      console.error('Error fetching opportunities:', err)
      return []
    }
  }

  async function createOpportunity(opportunity: any) {
    try {
      const response = await axios.post(`${API_URL}/opportunities`, opportunity)
      return response.data
    } catch (err: any) {
      error.value = err
      console.error('Error creating opportunity:', err)
      throw err
    }
  }

  return {
    error,
    fetchDashboardData,
    fetchContacts,
    createContact,
    fetchOpportunities,
    createOpportunity,
  }
}