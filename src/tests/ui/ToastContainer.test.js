
// ToastContainer.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ToastContainer from '../../components/UI/ToastContainer.vue';

describe('ToastContainer.vue', () => {
  it('renders the default slot content', () => {
    const wrapper = mount(ToastContainer, {
      slots: {
        default: '<div class="test-toast">Hello Toast!</div>',
      },
    });

    expect(wrapper.find('.test-toast').exists()).toBe(true);
    expect(wrapper.text()).toContain('Hello Toast!');
  });

  it('has the correct fixed positioning and z-index', () => {
    const wrapper = mount(ToastContainer);
    const container = wrapper.find('div');

    expect(container.classes()).toContain('fixed');
    expect(container.classes()).toContain('bottom-4');
    expect(container.classes()).toContain('right-4');
    expect(container.classes()).toContain('z-50');
  });
});
