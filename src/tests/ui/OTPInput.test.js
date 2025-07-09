
// OTPInput.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import OTPInput from '../../components/UI/OTPInput.vue';

describe('OTPInput.vue', () => {
  const defaultProps = {
    length: 4,
  };

  it('renders the correct number of input fields', () => {
    const wrapper = mount(OTPInput, { props: defaultProps });
    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBe(defaultProps.length);
  });

  it('moves focus to the next input on single digit entry', async () => {
    const wrapper = mount(OTPInput, { props: defaultProps, attachTo: document.body });
    const inputs = wrapper.findAll('input');

    expect(inputs.length).toBeGreaterThan(0);
    inputs.forEach(input => expect(input.element).not.toBeNull());

    // --- Test 1: From inputs[0] to inputs[1] ---
    await inputs[0].setValue('1');
    await wrapper.vm.$nextTick();

    // Check if focus moved to the second input
    setTimeout(()=>{
      expect(document.activeElement).toBe(inputs[1].element);
    }, 100)

    // --- Test 2: From inputs[1] to inputs[2]
    await inputs[1].setValue('2');
    await wrapper.vm.$nextTick();

    expect(document.activeElement).toBe(inputs[2].element);

    wrapper.unmount();
  });

  it('moves focus to the previous input on backspace in an empty field', async () => {
    const wrapper = mount(OTPInput, { props: defaultProps, attachTo: document.body });
    const inputs = wrapper.findAll('input');

    await inputs[0].setValue('1');
    await inputs[1].setValue('2');

    // Backspace in a filled input just clears it
    await inputs[1].setValue('');
    await inputs[1].trigger('keydown.backspace');
    setTimeout(()=>{
      expect(document.activeElement).toBe(inputs[0].element);
    }, 100)

    wrapper.unmount();
  });

  it('emits update:modelValue with the complete OTP string', async () => {
    const wrapper = mount(OTPInput, { props: defaultProps });
    const inputs = wrapper.findAll('input');

    await inputs[0].setValue('1');
    await inputs[1].setValue('2');
    await inputs[2].setValue('3');
    await inputs[3].setValue('4');

    expect(wrapper.emitted('update:modelValue').pop()).toEqual(['1234']);
  });

  it('emits a "complete" event when all inputs are filled', async () => {
    const wrapper = mount(OTPInput, { props: defaultProps });
    const inputs = wrapper.findAll('input');

    await inputs[0].setValue('1');
    await inputs[1].setValue('2');
    await inputs[2].setValue('3');
    await inputs[3].setValue('4');

    expect(wrapper.emitted('complete')).toBeTruthy();
    expect(wrapper.emitted('complete')[0]).toEqual(['1234']);
  });

  it('prevents non-numeric input', async () => {
    const wrapper = mount(OTPInput, { props: defaultProps });
    const firstInput = wrapper.find('input');

    await firstInput.setValue('a');
    expect(firstInput.element.value).toBe('');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy(); // Should not emit
  });

  it('is disabled when the disabled prop is true', () => {
    const wrapper = mount(OTPInput, { props: { ...defaultProps, disabled: true } });
    const inputs = wrapper.findAll('input');

    inputs.forEach(input => {
      expect(input.attributes('disabled')).toBeDefined();
    });
  });
});
