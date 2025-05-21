import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BuildProfile from '../../components/pages/build-profile/index.vue'

describe('BuildProfile.vue', () => {
  it('renders the home province step by default', () => {
    const wrapper = mount(BuildProfile)
    expect(wrapper.text()).toContain('Tell us your home province')
  })

  it('navigates to traveling experience step when "Next" is clicked on home province', async () => {
    const wrapper = mount(BuildProfile)
    await wrapper.findComponent({ name: 'Button' }).trigger('click')
    expect(wrapper.text()).toContain('Do you have traveling experience?')
  })

  it('adds and removes a vacation spot correctly', async () => {
    const wrapper = mount(BuildProfile)

    // Move to 'vacations' step manually
    await wrapper.setData({ activeInput: 'vacations' })

    const beachButton = wrapper.findAllComponents({ name: 'SquareButton' }).find(btn =>
      btn.props('value') === 'beaches'
    )

    await beachButton.trigger('click')
    expect(wrapper.vm.spentVacations).toContain('beaches')

    await beachButton.trigger('click')
    expect(wrapper.vm.spentVacations).not.toContain('beaches')
  })

  it('sets the correct store values on buildProfile', async () => {
    const wrapper = mount(BuildProfile)

    // Fill in the data
    await wrapper.setData({
      homeProvince: 'Cebu',
      hasExperience: true,
      spentVacations: ['beaches', 'mountains'],
      heardUs: 'friends',
    })

    // Trigger buildProfile
    wrapper.vm.buildProfile()

    const store = wrapper.vm.useRegister.get()
    expect(store.homeProvince).toBe('Cebu')
    expect(store.hasExperience).toBe(true)
    expect(store.spentVacations).toEqual([])
    expect(store.heardUs).toBe('friends')
  })
})
