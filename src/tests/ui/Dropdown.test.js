
// Dropdown.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Dropdown from '../../components/UI/Dropdown.vue';

describe('Dropdown.vue', () => {
  const defaultProps = {
    items: ['Profile', 'Settings', 'Log Out'],
  };

  it('renders the trigger button with default slot content', () => {
    const wrapper = mount(Dropdown, { props: defaultProps });
    expect(wrapper.find('button').text()).toContain('Dropdown');
  });

  it('renders the trigger button with custom slot content', () => {
    const wrapper = mount(Dropdown, {
      props: defaultProps,
      slots: { default: 'My Menu' },
    });
    expect(wrapper.find('button').text()).toContain('My Menu');
  });

  it('toggles the dropdown menu on button click', async () => {
    const wrapper = mount(Dropdown, { props: defaultProps });

    // Initially closed
    expect(wrapper.find('ul').exists()).toBe(false);

    // Click to open
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.findAll('li').length).toBe(defaultProps.items.length);

    // Click to close
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('ul').exists()).toBe(false);
  });

  it('emits a "select" event and closes the menu when an item is clicked', async () => {
    const wrapper = mount(Dropdown, { props: defaultProps });
    await wrapper.find('button').trigger('click'); // Open menu

    // Click the second item
    await wrapper.findAll('li')[1].trigger('click');

    // Check emitted event
    expect(wrapper.emitted('select')).toBeTruthy();
    expect(wrapper.emitted('select')[0]).toEqual(['Settings']);

    // Check if menu is closed
    expect(wrapper.find('ul').exists()).toBe(false);
  });

  it('is disabled when the disabled prop is true', async () => {
    const wrapper = mount(Dropdown, { props: { ...defaultProps, disabled: true } });
    const button = wrapper.find('button');

    expect(button.attributes('disabled')).toBeDefined();
    expect(button.classes()).toContain('opacity-50');

    // Clicking should not open the menu
    await button.trigger('click');
    expect(wrapper.find('ul').exists()).toBe(false);
  });

  it('applies correct size and variant classes', () => {
    // Test size
    const smWrapper = mount(Dropdown, { props: { ...defaultProps, size: 'sm' } });
    expect(smWrapper.find('button').classes()).toContain('text-sm');

    // Test variant
    const secondaryWrapper = mount(Dropdown, { props: { ...defaultProps, variant: 'secondary' } });
    expect(secondaryWrapper.find('button').classes()).toContain('bg-zinc-700');
  });
});
