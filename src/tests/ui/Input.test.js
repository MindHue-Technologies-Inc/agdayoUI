
// Input.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Input from '../../components/UI/Input.vue';

describe('Input.vue', () => {
  const defaultProps = {
    id: 'test-input',
    label: 'Test Label',
    modelValue: '',
  };

  it('renders a labeled input with a placeholder', () => {
    const placeholder = 'Enter text here';
    const wrapper = mount(Input, {
      props: { ...defaultProps, placeholder },
    });

    expect(wrapper.find('label').text()).toBe(defaultProps.label);
    expect(wrapper.find('input').attributes('placeholder')).toBe(placeholder);
  });

  it('binds the value with v-model (modelValue)', async () => {
    const wrapper = mount(Input, { props: defaultProps });
    const input = wrapper.find('input');

    // Simulate user typing
    await input.setValue('hello world');

    // Check emitted event
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['hello world']);

    // Check if component updates with new prop value
    await wrapper.setProps({ modelValue: 'prop update' });
    expect(input.element.value).toBe('prop update');
  });

  it('is disabled when the disabled prop is true', () => {
    const wrapper = mount(Input, {
      props: { ...defaultProps, disabled: true },
    });

    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeDefined();
    expect(input.classes()).toContain('cursor-not-allowed');
  });

  it('displays an error message when the error prop is provided', () => {
    const error = 'This field is required';
    const wrapper = mount(Input, {
      props: { ...defaultProps, error },
    });

    expect(wrapper.find('.text-red-500').exists()).toBe(true);
    expect(wrapper.find('.text-red-500').text()).toBe(error);
  });

  it('renders prefix and suffix text', () => {
    const wrapper = mount(Input, {
      props: { ...defaultProps, prefix: '$', suffix: 'USD' },
    });

    expect(wrapper.text()).toContain('$');
    expect(wrapper.text()).toContain('USD');
    expect(wrapper.find('input').classes()).toContain('pl-14');
    expect(wrapper.find('input').classes()).toContain('pr-12');
  });

  it('emits an "enter" event on keyup.enter', async () => {
    const wrapper = mount(Input, { props: defaultProps });
    await wrapper.find('input').trigger('keyup.enter');

    expect(wrapper.emitted('enter')).toBeTruthy();
  });

  describe('Number input with comma formatting', () => {
    it('formats a numeric value with commas on blur', async () => {
      const wrapper = mount(Input, {
        props: { ...defaultProps, type: 'number', formatCommas: true, modelValue: '1234567' },
      });
      const input = wrapper.find('input');

      // Should not be formatted while focused
      await input.trigger('focus');
      expect(input.element.value).toBe('1234567');

      // Should be formatted on blur
      await input.trigger('blur');
      expect(input.element.value).toBe('1,234,567');
    });

    it('removes commas on input', async () => {
      const wrapper = mount(Input, {
        props: { ...defaultProps, type: 'number', formatCommas: true, modelValue: '1,234,567' },
      });
      const input = wrapper.find('input');

      // Simulate user input with commas
      await input.setValue('1,000,000');

      // The emitted value should have commas stripped
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['1000000']);
    });

    it('prevents non-numeric characters from being entered', async () => {
      const wrapper = mount(Input, { props: { ...defaultProps, type: 'number' } });
      const input = wrapper.find('input');

      const event = new KeyboardEvent('keydown', { key: 'a' });
      vi.spyOn(event, 'preventDefault');
      await input.element.dispatchEvent(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});
