
// SelectSimple.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SelectSimple from '../../components/UI/SelectSimple.vue';

describe('SelectSimple.vue', () => {
  vi.useFakeTimers();

  const defaultProps = {
    id: 'simple-select',
    label: 'Simple Select',
    placeholder: 'Choose an option',
    options: [
      { label: 'First Option', value: 1 },
      { label: 'Second Option', value: 2 },
      { label: 'Third Option', value: 3 },
    ],
  };

  it('renders with a label and placeholder when no value is selected', () => {
    const wrapper = mount(SelectSimple, { props: defaultProps });

    expect(wrapper.find('label').text()).toBe(defaultProps.label);
    expect(wrapper.find('button').text()).toContain(defaultProps.placeholder);
  });

  it('displays the label of the selected option', async () => {
    const wrapper = mount(SelectSimple, { props: defaultProps });

    await wrapper.setProps({ modelValue: 2 });

    expect(wrapper.find('button').text()).toContain('Second Option');
  });

  it('toggles the options list on button click', async () => {
    const wrapper = mount(SelectSimple, { props: defaultProps });

    expect(wrapper.find('ul').exists()).toBe(false);

    await wrapper.find('button').trigger('click');
    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(defaultProps.options.length);

    await wrapper.find('button').trigger('click');
    expect(wrapper.find('ul').exists()).toBe(false);
  });

  it('emits update:modelValue and closes the list when an option is clicked', async () => {
    const wrapper = mount(SelectSimple, { props: defaultProps });
    await wrapper.find('button').trigger('click'); // Open list

    await wrapper.findAll('li')[1].trigger('mousedown');

    expect(wrapper.emitted('update:modelValue')[0]).toEqual([2]);
    expect(wrapper.vm.showOptions).toBe(false);
  });

  it('closes the options list on blur', async () => {
    vi.useFakeTimers()
    const wrapper = mount(SelectSimple, { props: defaultProps });
    await wrapper.find('button').trigger('click'); // Open

    expect(wrapper.vm.showOptions).toBe(true);

    await wrapper.find('button').trigger('blur');
    vi.runAllTimers(); // Fast-forward setTimeout
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showOptions).toBe(false);
  });

  it('is disabled when the disabled prop is true', async () => {
    const wrapper = mount(SelectSimple, { props: { ...defaultProps, disabled: true } });
    const button = wrapper.find('button');

    expect(button.attributes('disabled')).toBeDefined();
    expect(button.classes()).toContain('cursor-not-allowed');

    await button.trigger('click');
    expect(wrapper.vm.showOptions).toBe(false);
  });

  it('displays a "no options" message when the list is empty', async () => {
    const wrapper = mount(SelectSimple, { props: { ...defaultProps, options: [] } });
    await wrapper.find('button').trigger('click');

    expect(wrapper.find('.text-zinc-500').exists()).toBe(true);
    expect(wrapper.find('.text-zinc-500').text()).toContain('Choose an option');
  });

  vi.useRealTimers();
});
