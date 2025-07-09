
// Spinner.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Spinner from '../../components/UI/Spinner.vue';

describe('Spinner.vue', () => {
  it('renders the spinner icon', () => {
    const wrapper = mount(Spinner);

    // Check that the root element is an <i> tag
    expect(wrapper.find('i').exists()).toBe(true);

    // Check for the correct classes
    expect(wrapper.classes()).toContain('ph-spinner');
    expect(wrapper.classes()).toContain('animate-spin');
  });
});
