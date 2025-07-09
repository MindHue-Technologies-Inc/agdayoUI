
// Tag.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Tag from '../../components/UI/Tag.vue';

describe('Tag.vue', () => {
  const defaultProps = {
    label: 'Test Tag',
  };

  it('renders as a span with the correct label and default variant', () => {
    const wrapper = mount(Tag, { props: defaultProps });

    expect(wrapper.element.tagName).toBe('SPAN');
    expect(wrapper.text()).toBe(defaultProps.label);

    // Check for default variant classes (peach)
    expect(wrapper.classes()).toContain('!text-peach-600');
    expect(wrapper.classes()).toContain('bg-peach-100');
  });

  it('renders as a button when mode is "button"', () => {
    const wrapper = mount(Tag, {
      props: { ...defaultProps, mode: 'button' },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.classes()).toContain('cursor-pointer');
  });

  it('applies the correct classes for different variants', () => {
    const variants = ['blue', 'green', 'red', 'gray', 'purple', 'yellow'];
    const expectedClasses = {
      blue: ['!text-cyan-700', 'bg-cyan-200'],
      green: ['!text-emerald-700', 'bg-emerald-200'],
      red: ['!text-rose-700', 'bg-rose-200'],
      gray: ['!text-zinc-700', 'bg-zinc-200'],
      purple: ['!text-purple-700', 'bg-purple-200'],
      yellow: ['!text-amber-700', 'bg-amber-200'],
    };

    variants.forEach(variant => {
      const wrapper = mount(Tag, { props: { ...defaultProps, variant } });
      expect(wrapper.classes()).toContain(expectedClasses[variant][0]);
      expect(wrapper.classes()).toContain(expectedClasses[variant][1]);
    });
  });
});
