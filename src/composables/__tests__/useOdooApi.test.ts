import { describe, it, expect, vi } from 'vitest'
import { useOdooApi } from '../useOdooApi'
import axios from 'axios'

vi.mock('axios')

describe('useOdooApi', () => {
  it('fetches dashboard data correctly', async () => {
    const mockResponse = { data: { totalContacts: 10, totalOpportunities: 5, totalRevenue: 50000 } }
    vi.mocked(axios.get).mockResolvedValue(mockResponse)

    const { fetchDashboardData } = useOdooApi()
    const result = await fetchDashboardData()

    expect(axios.get).toHaveBeenCalledWith('/.netlify/functions/odoo-api/dashboard')
    expect(result).toEqual(mockResponse.data)
  })

  it('fetches contacts correctly', async () => {
    const mockResponse = { data: [{ id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' }] }
    vi.mocked(axios.get).mockResolvedValue(mockResponse)

    const { fetchContacts } = useOdooApi()
    const result = await fetchContacts()

    expect(axios.get).toHaveBeenCalledWith('/.netlify/functions/odoo-api/contacts')
    expect(result).toEqual(mockResponse.data)
  })

  it('creates a contact correctly', async () => {
    const mockResponse = { data: { id: 2 } }
    vi.mocked(axios.post).mockResolvedValue(mockResponse)

    const { createContact } = useOdooApi()
    const newContact = { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' }
    const result = await createContact(newContact)

    expect(axios.post).toHaveBeenCalledWith('/.netlify/functions/odoo-api/contacts', newContact)
    expect(result).toEqual(mockResponse.data)
  })

  it('fetches opportunities correctly', async () => {
    const mockResponse = { data: [{ id: 1, name: 'Big Sale', amount: 10000, stage: 'New' }] }
    vi.mocked(axios.get).mockResolvedValue(mockResponse)

    const { fetchOpportunities } = useOdooApi()
    const result = await fetchOpportunities()

    expect(axios.get).toHaveBeenCalledWith('/.netlify/functions/odoo-api/opportunities')
    expect(result).toEqual(mockResponse.data)
  })

  it('creates an opportunity correctly', async () => {
    const mockResponse = { data: { id: 2 } }
    vi.mocked(axios.post).mockResolvedValue(mockResponse)

    const { createOpportunity } = useOdooApi()
    const newOpportunity = { name: 'Medium Deal', amount: 5000, stage: 'Qualified' }
    const result = await createOpportunity(newOpportunity)

    expect(axios.post).toHaveBeenCalledWith('/.netlify/functions/odoo-api/opportunities', newOpportunity)
    expect(result).toEqual(mockResponse.data)
  })
})