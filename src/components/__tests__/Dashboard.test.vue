import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Dashboard from '../Dashboard.vue'
import { useOdooApi } from '../../composables/useOdooApi'

vi.mock('../../composables/useOdooApi')

describe('Dashboard', () => {
  it('renders dashboard data correctly', async () => {
    const mockFetchDashboardData = vi.fn().mockResolvedValue({
      totalContacts: 10,
      totalOpportunities: 5,
      totalRevenue: 50000
    })
    
    vi.mocked(useOdooApi).mockReturnValue({
      fetchDashboardData: mockFetchDashboardData,
      error: { value: null }
    } as any)

    const wrapper = mount(Dashboard)
    
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(mockFetchDashboardData).toHaveBeenCalled()
    expect(wrapper.text()).toContain('10')
    expect(wrapper.text()).toContain('5')
    expect(wrapper.text()).toContain('50000')
  })
})