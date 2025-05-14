import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import CreateBalance from '../../components/pages/Getting-Started/CreateBalance.vue'

// Mocks
vi.mock('../../stores/auth', () => ({
  useAuthStore: {
    value: {
      token: 'test-token',
      user: {
        user_account: {
          id: 1
        }
      }
    }
  }
}))

vi.mock('../../fetch', () => ({
  apiRequest: vi.fn(() => Promise.resolve({}))
}))

describe('CreateBalance.vue', () => {
  it('renders form fields', () => {
    const wrapper = mount(CreateBalance)
    expect(wrapper.text()).toContain('Create an Account')
    expect(wrapper.text()).toContain('Account Name')
    expect(wrapper.text()).toContain('Current Balance')
    expect(wrapper.text()).toContain('Type')
    expect(wrapper.text()).toContain('Set as default account')
  })

  it('renders icon selection buttons', () => {
    const wrapper = mount(CreateBalance)
    const iconButtons = wrapper.findAll('button i')
    expect(iconButtons.length).toBeGreaterThan(0)
  })

  it('calls back() on "Go Back" button click', async () => {
    const wrapper = mount(CreateBalance)

    // Mock window.location
    const originalLocation = window.location
    delete window.location
    window.location = { href: '' }

    await wrapper.findAllComponents({ name: 'Button' })[0].trigger('click')
    expect(window.location.href).toBe('/getting-started')

    window.location = originalLocation
  })

  it('submits account and shows success toast', async () => {
    const wrapper = mount(CreateBalance)

    // Mock window.location
    const originalLocation = window.location
    delete window.location
    window.location = { href: '' }

    await wrapper.findAllComponents({ name: 'Button' })[1].trigger('click')
    expect(wrapper.vm.successToast.show).toBe(true)
    expect(wrapper.vm.successToast.message).toBe('Account added successfully!')

    window.location = originalLocation
  })

  it('displays danger toast on failure', async () => {
    // Override the mock to throw
    const { apiRequest } = await import('../../fetch')
    apiRequest.mockImplementationOnce(() => { throw new Error('fail') })

    const wrapper = mount(CreateBalance)
    await wrapper.findAllComponents({ name: 'Button' })[1].trigger('click')

    expect(wrapper.vm.dangerToast.show).toBe(true)
    expect(wrapper.vm.dangerToast.message).toBe('Something went wrong.')
  })
})
