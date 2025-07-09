
// Card.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Card from '../../components/UI/Card.vue';

describe('Card.vue', () => {
  it('renders with default props and slots', () => {
    const slotContent = '<p>Default Slot Content</p>';
    const wrapper = mount(Card, {
      slots: {
        default: slotContent,
      },
    });

    // Check if the default slot content is rendered
    expect(wrapper.html()).toContain(slotContent);

    // Check for default classes
    expect(wrapper.classes()).toContain('bg-white');
    expect(wrapper.classes()).toContain('rounded-4xl');
  });

  it('applies the correct background class based on the variant prop', () => {
    // Test 'transparent' variant
    const transparentWrapper = mount(Card, {
      props: { variant: 'transparent' },
    });
    expect(transparentWrapper.classes()).toContain('bg-transparent');

    // Test 'subtle' variant
    const subtleWrapper = mount(Card, {
      props: { variant: 'subtle' },
    });
    expect(subtleWrapper.classes()).toContain('bg-zinc-100');

    // Test 'dotted' variant
    const dottedWrapper = mount(Card, {
      props: { variant: 'dotted' },
    });
    expect(dottedWrapper.classes()).toContain('dotted-bg');
  });

  it('applies custom classes', () => {
    const customClass = 'my-custom-card-class';
    const wrapper = mount(Card, {
      props: { customClass },
    });

    expect(wrapper.classes()).toContain(customClass);
  });

  it('renders an empty div if no slot content is provided', () => {
    const wrapper = mount(Card);
    // The component should still render its root div
    expect(wrapper.find('.card-container').exists()).toBe(true);
    // And it should be empty
    expect(wrapper.html()).not.toContain('<p>');
  });
});
