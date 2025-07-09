
// Button.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Button from '../../components/UI/Button.vue';

describe('Button.vue', () => {
  // Default props for cleaner tests
  const defaultProps = {
    variant: 'primary',
    size: 'md',
    type: 'button',
  };

  it('renders a button with default props', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click Me',
      },
    });

    // Check that the root element is a button
    expect(wrapper.find('button').exists()).toBe(true);

    // Check for default slot content
    expect(wrapper.text()).toBe('Click Me');

    // Check for default classes
    expect(wrapper.classes()).toContain('bg-peach-500'); // Primary variant
    expect(wrapper.classes()).toContain('text-base'); // Medium size
  });

  it('applies the correct classes for different variants', () => {
    // Test 'secondary' variant
    const secondaryWrapper = mount(Button, {
      props: { ...defaultProps, variant: 'secondary' },
    });
    expect(secondaryWrapper.classes()).toContain('bg-zinc-100');

    // Test 'danger' variant
    const dangerWrapper = mount(Button, {
      props: { ...defaultProps, variant: 'danger' },
    });
    expect(dangerWrapper.classes()).toContain('bg-rose-500');

    // Test 'ghost' variant
    const ghostWrapper = mount(Button, {
      props: { ...defaultProps, variant: 'ghost' },
    });
    expect(ghostWrapper.classes()).toContain('border-peach-500');
  });

  it('applies the correct classes for different sizes', () => {
    // Test 'sm' size
    const smWrapper = mount(Button, {
      props: { ...defaultProps, size: 'sm' },
    });
    expect(smWrapper.classes()).toContain('text-sm');

    // Test 'lg' size
    const lgWrapper = mount(Button, {
      props: { ...defaultProps, size: 'lg' },
    });
    expect(lgWrapper.classes()).toContain('text-lg');
  });

  it('disables the button when the disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: { ...defaultProps, disabled: true },
    });

    // Check for disabled attribute
    expect(wrapper.attributes('disabled')).toBeDefined();

    // Check for disabled-related classes
    expect(wrapper.classes()).toContain('opacity-50');
    expect(wrapper.classes()).toContain('cursor-not-allowed');
  });

  it('emits a "clicked" event when clicked', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');

    // Check if the 'clicked' event was emitted
    expect(wrapper.emitted('clicked')).toBeTruthy();
    expect(wrapper.emitted('clicked').length).toBe(1);
  });

  it('does not emit a "clicked" event when disabled', async () => {
    const wrapper = mount(Button, {
      props: { ...defaultProps, disabled: true },
    });
    await wrapper.trigger('click');

    // The event should not be emitted
    expect(wrapper.emitted('clicked')).toBeFalsy();
  });

  it('shows a loading spinner when loading is true', () => {
    const wrapper = mount(Button, {
      props: { ...defaultProps, loading: true },
    });

    // Check for the spinner icon
    expect(wrapper.find('i.ph-spinner').exists()).toBe(true);

    // The button should also be disabled
    expect(wrapper.attributes('disabled')).toBeDefined();

    // Slot content should not be rendered
    expect(wrapper.text()).toBe('');
  });

  it('applies custom classes', () => {
    const customClass = 'my-custom-class';
    const wrapper = mount(Button, {
      props: { ...defaultProps, customClass },
    });

    expect(wrapper.classes()).toContain(customClass);
  });
});
