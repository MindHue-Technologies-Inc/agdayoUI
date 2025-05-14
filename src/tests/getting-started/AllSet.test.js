import { mount } from '@vue/test-utils'
import { vi, expect } from 'vitest'
import AllSet from '../../components/pages/Getting-Started/AllSet.vue'

describe('AllSet.vue', () => {
  // Test if the heading and message are rendered correctly
  it('renders heading and message', () => {
    const wrapper = mount(AllSet)
    expect(wrapper.text()).toContain('You are all set!')
    expect(wrapper.text()).toContain('Thank you for signing up!')
  })

  // Test if the Start button is rendered correctly
  it('renders a Start button', () => {
    const wrapper = mount(AllSet)
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Start')
  })

  // Simplified test for navigation
  it('navigates to /expense-plan on button click', async () => {
    // Save original location
    const originalLocation = window.location;
    
    // Mock window.location.href setter
    delete window.location;
    window.location = Object.create(Object.getPrototypeOf(originalLocation));
        
    // Use a simple variable to track the new URL
    let redirectUrl = null;
    Object.defineProperty(window.location, 'href', {
      set(value) { redirectUrl = value; },
      get() { return originalLocation.href; }
    });
    
    // Mount component and click button
    const wrapper = mount(AllSet);
    await wrapper.find('button').trigger('click');
    
    // Check if navigation happened correctly
    expect(redirectUrl).toBe('/expense-plan');
    
    // Restore original location
    window.location = originalLocation;
  })
})