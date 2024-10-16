import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Contacts from '../Contacts.vue'
import { useOdooApi } from '../../composables/useOdooApi'

vi.mock('../../composables/useOdooApi')

describe('Contacts', () => {
  it('renders contacts data correctly', async () => {
    const mockContacts = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' }
    ]
    
    const mockFetchContacts = vi.fn().mockResolvedValue(mockContacts)
    const mockCreateContact = vi.fn().mockResolvedValue({ id: 3 })
    
    vi.mocked(useOdooApi).mockReturnValue({
      fetchContacts: mockFetchContacts,
      createContact: mockCreateContact,
      error: { value: null }
    } as any)

    const wrapper = mount(Contacts)
    
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(mockFetchContacts).toHaveBeenCalled()
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Jane Smith')

    // Test creating a new contact
    await wrapper.find('button').trigger('click')
    const form = wrapper.find('form')
    await form.find('input[placeholder="Name"]').setValue('New Contact')
    await form.find('input[placeholder="Email"]').setValue('new@example.com')
    await form.find('input[placeholder="Phone"]').setValue('555-555-5555')
    await form.trigger('submit')

    expect(mockCreateContact).toHaveBeenCalledWith({
      name: 'New Contact',
      email: 'new@example.com',
      phone: '555-555-5555'
    })
  })
})