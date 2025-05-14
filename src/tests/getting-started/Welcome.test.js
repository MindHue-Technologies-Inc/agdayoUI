import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Welcome from "../../components/pages/Getting-Started/Welcome.vue";

describe('Welcome.vue', () => {
  it('renders welcome', () => {
    const wrapper = mount(Welcome)
    expect(wrapper.text()).toContain('WELCOME')
  })

  it('navigates to /create-an-account on button click', async () => {
    // save orignal location
    const originalLocation = window.location;

    // Mock window.location.href settings
    delete window.location;
    window.location = Object.create(Object.getPrototypeOf(originalLocation));

    // Use a simple variable to track the new URL
    let redirectUrl = null;
    Object.defineProperty(window.location, 'href', {
      set(value) { redirectUrl = value; },
      get() { return originalLocation.href; }
    });

    // Mount component and click the button
    const wrapper = mount(Welcome);
    await wrapper.find('button').trigger('click');

    // Check if naviation happened correctly
    expect(redirectUrl).toBe('/getting-started/create-an-account');
    
    // Restore original location
    window.location = originalLocation
  })
})