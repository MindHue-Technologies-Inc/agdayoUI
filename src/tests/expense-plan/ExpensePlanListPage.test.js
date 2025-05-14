import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ExpensePlanListPage from '../../components/pages/Expenses/ExpensePlanListPage.vue'

vi.mock('../../stores/auth', () => ({
  useAuthStore: {
    value: {
      token: 'test-token',
      isAuthenticated: true,
      user: {
        user_account: {
          id: 1
        }
      }
    }
  }
}))

vi.mock('../../fetch', () => ({
  apiRequest: vi.fn(() => Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, name: 'Main', default: true }
    ])
  }))
}))

global.fetch = vi.fn((url) => {
  if (url.includes('/expense/expense-plans')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([])
    })
  }
  if (url.includes('/expense/expense-plans') && fetch.mock.calls.length > 1) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: 1 })
    })
  }
  if (url.includes('/expense/transactions')) {
    return Promise.resolve({ 
      ok: true, 
      json: () => Promise.resolve([]) 
    })
  }
  return Promise.reject('Unknown API call')
})

describe('ExpensePlanListPage.vue', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = mount(ExpensePlanListPage)
    await flushPromises()
  })

  it('renders correctly', () => {
    expect(wrapper.text()).toContain('No Expense Plans Yet')
  })

  it('opens modal on button click', async () => {
    const addButton = wrapper.find('#addExpense')
    await addButton.trigger('click')
    expect(wrapper.findComponent({ ref: 'addExpensePlanModal' }).exists()).toBe(true)
  })

  it('filters plans by query', async () => {
    wrapper.setData({
      expensePlans: [
        { id: 1, name: 'Groceries', dateStart: '2023-01-01', dateEnd: '2023-01-31', createdAt: '2023-01-01', transactions: [] },
        { id: 2, name: 'Utilities', dateStart: '2023-02-01', dateEnd: '2023-02-28', createdAt: '2023-02-01', transactions: [] }
      ],
      query: 'gro'
    })
    await flushPromises()
    expect(wrapper.vm.filteredExpensePlans.length).toBe(1)
    expect(wrapper.vm.filteredExpensePlans[0].name).toBe('Groceries')
  })

  it('shows success toast after save', async () => {
    wrapper.setData({
      addExpensePlanConfig: {
        name: 'Test Plan',
        dateStart: '2023-01-01',
        dateEnd: '2023-01-01',
        transactions: [{
          balance_source_id: 1,
          transfer_to_id: '',
          name: 'Buy Milk',
          type: 'expense',
          category: 'Groceries',
          cost: 10,
          transaction_at: '2023-01-01'
        }]
      }
    })
    // optional log to verify state
    await wrapper.vm.saveAndClose()
    expect(wrapper.vm.successToast.show).toBe(true)
  })
})
