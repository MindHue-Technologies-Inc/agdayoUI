
// InputTitle.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import InputTitle from '../../components/UI/InputTitle.vue';

describe('InputTitle.vue', () => {
  const defaultProps = {
    id: 'title-input',
    label: 'Title',
    modelValue: '',
  };

  it('renders a labeled input with a placeholder', () => {
    const placeholder = 'Enter a title';
    const wrapper = mount(InputTitle, {
      props: { ...defaultProps, placeholder },
    });

    expect(wrapper.find('label').text()).toBe(defaultProps.label);
    expect(wrapper.find('input').attributes('placeholder')).toBe(placeholder);
  });

  it('binds the value with v-model (modelValue)', async () => {
    const wrapper = mount(InputTitle, { props: defaultProps });
    const input = wrapper.find('input');

    await input.setValue('My Awesome Title');

    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['My Awesome Title']);

    await wrapper.setProps({ modelValue: 'Updated Title' });
    expect(input.element.value).toBe('Updated Title');
  });

  it('is disabled when the disabled prop is true', () => {
    const wrapper = mount(InputTitle, { props: { ...defaultProps, disabled: true } });
    const input = wrapper.find('input');

    expect(input.attributes('disabled')).toBeDefined();
    expect(input.classes()).toContain('disabled:text-zinc-400');
  });

  it('displays an error message when the error prop is provided', () => {
    const error = 'Title is too short';
    const wrapper = mount(InputTitle, { props: { ...defaultProps, error } });

    expect(wrapper.find('.text-red-500').exists()).toBe(true);
    expect(wrapper.find('.text-red-500').text()).toBe(error);
  });

  it('sets the input type based on the type prop', () => {
    const wrapper = mount(InputTitle, { props: { ...defaultProps, type: 'number' } });
    expect(wrapper.find('input').attributes('type')).toBe('number');
  });
});
