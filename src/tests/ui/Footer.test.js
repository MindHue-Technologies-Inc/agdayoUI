
// Footer.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Footer from '../../components/UI/Footer.vue';

describe('Footer.vue', () => {
  it('renders the current year in the copyright notice', () => {
    const wrapper = mount(Footer);
    const currentYear = new Date().getFullYear();

    expect(wrapper.find('footer').exists()).toBe(true);
    expect(wrapper.text()).toContain(`© ${currentYear} MindHue Technologies Inc. All rights reserved.`);
  });
});
