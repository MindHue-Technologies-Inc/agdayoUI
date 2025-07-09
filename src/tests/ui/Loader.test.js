
// Loader.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Loader from '../../components/UI/Loader.vue';

describe('Loader.vue', () => {
  it('renders the loader with a spinner icon', () => {
    const wrapper = mount(Loader);

    // Check for the main container
    expect(wrapper.find('.w-full.h-screen').exists()).toBe(true);

    // Check for the spinner icon
    const icon = wrapper.find('i');
    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain('ph-spinner');
    expect(icon.classes()).toContain('animate-spin');
  });
});
