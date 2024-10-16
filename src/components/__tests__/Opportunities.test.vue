import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Opportunities from '../Opportunities.vue'
import { useOdooApi } from '../../composables/useOdooApi'

vi.mock('../../composables/useOdooApi')

describe('Opportunities', () => {
  it('renders opportunities data correctly', async () => {
    const mockOpportunities = [
      { id: 1, name: 'Big Sale', amount: 10000, stage: 'New' },
      { id: 2, name: 'Medium Deal', amount: 5000, stage: 'Qualified' }
    ]
    
    const mockFetchOpportunities = vi.fn().mockResolvedValue(mockOpportunities)
    const mockCreateOpportunity = vi.fn().mockResolvedValue({ id: 3 })
    
    vi.mocked(useOdooApi).mockReturnValue({
      fetchOpportunities: mockFetchOpportunities,
      createOpportunity: mockCreateOpportunity,
      error: { value: null }
    } as any)

    const wrapper = mount(Opportunities)
    
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(mockFetchOpportunities).toHaveBeenCalled()
    expect(wrapper.text()).toContain('Big Sale')
    expect(wrapper.text()).toContain('Medium Deal')

    // Test creating a new opportunity
    await wrapper.find('button').trigger('click')
    const form = wrapper.find('form')
    await form.find('input[placeholder="Name"]').setValue('New Opportunity')
    await form.find('input[type="number"]').setValue(15000)
    await form.find('select').setValue('Proposal')
    await form.trigger('submit')

    expect(mockCreateOpportunity).toHaveBeenCalledWith({
      name: 'New Opportunity',
      amount: 15000,
      stage: 'Proposal'
    })
  })
})