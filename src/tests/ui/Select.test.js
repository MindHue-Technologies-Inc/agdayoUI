
// Select.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Select from '../../components/UI/Select.vue';

describe('Select.vue', () => {
  const defaultProps = {
    id: 'test-select',
    label: 'Test Select',
    options: [
      { label: 'Option 1', value: 'one' },
      { label: 'Option 2', value: 'two' },
      { label: 'Another Option', value: 'three' },
    ],
  };

  it('renders with a label and placeholder', () => {
    const wrapper = mount(Select, {
      props: { ...defaultProps, placeholder: 'Select an option' },
    });

    expect(wrapper.find('label').text()).toBe(defaultProps.label);
    expect(wrapper.find('input').attributes('placeholder')).toBe('Select an option');
  });

  it('shows options on focus and hides them on blur', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Select, { props: defaultProps });

    // Focus to show options
    await wrapper.find('input').trigger('focus');
    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(defaultProps.options.length);

    // Blur to hide options
    await wrapper.find('input').trigger('blur');
    vi.runAllTimers(); // Fast-forward setTimeout in handleBlur
    await wrapper.vm.$nextTick(); // Wait for DOM update

    expect(wrapper.find('ul').exists()).toBe(false);
    vi.useRealTimers();
  });

  it('filters options based on search term', async () => {
    const wrapper = mount(Select, { props: defaultProps });
    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.setValue('Option 2');

    expect(wrapper.findAll('li').length).toBe(1);
    expect(wrapper.find('li').text()).toBe('Option 2');
  });

  it('selects an option on click', async () => {
    const wrapper = mount(Select, { props: defaultProps });
    await wrapper.find('input').trigger('focus');

    // Click the second option
    await wrapper.findAll('li')[1].trigger('mousedown');

    expect(wrapper.emitted('update:modelValue')[2]).toEqual(['two']);
    expect(wrapper.find('input').element.value).toBe('Option 2');
    expect(wrapper.find('ul').exists()).toBe(false); // Should hide after selection
  });

  it('handles keyboard navigation (down, up, enter)', async () => {
    const wrapper = mount(Select, { props: defaultProps });
    const input = wrapper.find('input');

    // Open with down arrow
    await input.trigger('keydown.down');
    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.findAll('li')[0].classes()).toContain('bg-peach-100'); // First is highlighted

    // Move down again
    await input.trigger('keydown.down');
    expect(wrapper.findAll('li')[1].classes()).toContain('bg-peach-100');

    // Move up
    await input.trigger('keydown.up');
    expect(wrapper.findAll('li')[0].classes()).toContain('bg-peach-100');

    // Select with Enter
    await input.trigger('keydown.enter');
    expect(wrapper.emitted('update:modelValue')[2]).toEqual(['one']);
    expect(wrapper.find('input').element.value).toBe('Option 1');
  });

  it('displays a "no results" message when filtering yields no options', async () => {
    const wrapper = mount(Select, { props: defaultProps });
    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.setValue('nonexistent');

    expect(wrapper.find('ul').exists()).toBe(false);
    expect(wrapper.find('.text-zinc-500').text()).toContain('No results found');
  });

  it('is disabled when the disabled prop is true', () => {
    const wrapper = mount(Select, { props: { ...defaultProps, disabled: true } });
    const input = wrapper.find('input');

    expect(input.attributes('disabled')).toBeDefined();
    expect(input.classes()).toContain('cursor-not-allowed');
  });
});
