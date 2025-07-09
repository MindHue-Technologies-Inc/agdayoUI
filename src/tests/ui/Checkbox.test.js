
// Checkbox.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Checkbox from '../../components/UI/Checkbox.vue';

describe('Checkbox.vue', () => {
  const defaultProps = {
    id: 'test-checkbox',
    label: 'Test Checkbox',
  };

  it('renders with a label and is unchecked by default', () => {
    const wrapper = mount(Checkbox, { props: defaultProps });

    // Check if the label is rendered correctly
    expect(wrapper.find('label').text()).toBe(defaultProps.label);
    expect(wrapper.find('label').attributes('for')).toBe(defaultProps.id);

    // Check if the input is rendered and is a checkbox
    const input = wrapper.find('input[type="checkbox"]');
    expect(input.exists()).toBe(true);
    expect(input.attributes('id')).toBe(defaultProps.id);

    // Check if it's unchecked by default (v-model is false)
    expect(input.element.checked).toBe(false);
  });

  it('reflects the v-model (modelValue) state', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        ...defaultProps,
        modelValue: false, // Explicitly start as false
      },
    });

    const input = wrapper.find('input[type="checkbox"]');

    // Check initial state
    expect(input.element.checked).toBe(false);

    // Update the prop to simulate v-model change
    await wrapper.setProps({ modelValue: true });

    // Check if the checkbox is now checked
    expect(input.element.checked).toBe(true);
  });

  it('emits an update:modelValue event on change', async () => {
    const wrapper = mount(Checkbox, { props: defaultProps });
    const input = wrapper.find('input[type="checkbox"]');

    // Simulate checking the box
    await input.setValue(true); // .setValue(true) is for checkboxes

    // Check if the event was emitted
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    // Check if the emitted value is correct
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true]);

    // Simulate unchecking the box
    await input.setValue(false);
    expect(wrapper.emitted('update:modelValue')[1]).toEqual([false]);
  });

  it('is disabled when the disabled prop is true', () => {
    const wrapper = mount(Checkbox, {
      props: {
        ...defaultProps,
        disabled: true,
      },
    });

    const input = wrapper.find('input[type="checkbox"]');
    expect(input.attributes('disabled')).toBeDefined();
    expect(input.classes()).toContain('disabled:cursor-not-allowed');
  });

  it('does not render a label if the label prop is not provided', () => {
    const wrapper = mount(Checkbox, {
      props: { id: 'no-label-checkbox' }, // No label prop
    });

    expect(wrapper.find('label').exists()).toBe(false);
  });

  it('applies custom classes to the input and label', () => {
    const wrapper = mount(Checkbox, {
      props: {
        ...defaultProps,
        customClass: 'my-input-class',
        labelClass: 'my-label-class',
      },
    });

    expect(wrapper.find('input').classes()).toContain('my-input-class');
    expect(wrapper.find('label').classes()).toContain('my-label-class');
  });
});
