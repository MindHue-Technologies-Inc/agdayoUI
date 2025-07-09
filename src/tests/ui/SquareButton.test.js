
// SquareButton.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SquareButton from '../../components/UI/SquareButton.vue';

describe('SquareButton.vue', () => {
  const defaultProps = {
    icon: 'ph-house',
    label: 'Home',
    value: 'home',
  };

  it('renders with an icon and label', () => {
    const wrapper = mount(SquareButton, { props: defaultProps });

    expect(wrapper.find('i.ph-house').exists()).toBe(true);
    expect(wrapper.text()).toContain('Home');
  });

  it('applies correct size classes', () => {
    const smWrapper = mount(SquareButton, { props: { ...defaultProps, size: 'sm' } });
    expect(smWrapper.classes()).toContain('w-14');
    expect(smWrapper.find('i').classes()).toContain('text-lg');

    const lgWrapper = mount(SquareButton, { props: { ...defaultProps, size: 'lg' } });
    expect(lgWrapper.classes()).toContain('w-24');
    expect(lgWrapper.find('i').classes()).toContain('text-3xl');
  });

  it('applies correct variant classes', () => {
    const primaryWrapper = mount(SquareButton, { props: { ...defaultProps, variant: 'primary' } });
    expect(primaryWrapper.classes()).toContain('bg-peach-500');

    const secondaryWrapper = mount(SquareButton, { props: { ...defaultProps, variant: 'secondary' } });
    expect(secondaryWrapper.classes()).toContain('bg-white');
  });

  it('shows loading spinner when loading prop is true', () => {
    const wrapper = mount(SquareButton, { props: { ...defaultProps, loading: true } });

    expect(wrapper.find('i.ph-spinner').exists()).toBe(true);
    expect(wrapper.find('i.ph-house').exists()).toBe(false);
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(SquareButton, { props: { ...defaultProps, disabled: true } });

    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('opacity-50');
  });

  it('applies active classes when modelValue matches value', () => {
    const wrapper = mount(SquareButton, { props: { ...defaultProps, modelValue: 'home' } });
    expect(wrapper.classes()).toContain('ring-2');
  });

  it('applies active classes when modelValue (array) includes value', () => {
    const wrapper = mount(SquareButton, { props: { ...defaultProps, modelValue: ['other', 'home'] } });
    expect(wrapper.classes()).toContain('ring-2');
  });

  it('does not apply active classes when modelValue does not match value', () => {
    const wrapper = mount(SquareButton, { props: { ...defaultProps, modelValue: 'away' } });
    expect(wrapper.classes()).not.toContain('ring-2');
  });
});
