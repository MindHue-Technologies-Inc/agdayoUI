
// Anchor.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Anchor from '../../components/UI/Anchor.vue';

describe('Anchor.vue', () => {
  const defaultProps = {
    href: 'https://example.com',
  };

  it('renders an anchor tag with the correct href and slot content', () => {
    const wrapper = mount(Anchor, {
      props: defaultProps,
      slots: {
        default: 'Click Here',
      },
    });

    const anchor = wrapper.find('a');
    expect(anchor.exists()).toBe(true);
    expect(anchor.attributes('href')).toBe(defaultProps.href);
    expect(anchor.text()).toBe('Click Here');
  });

  it('applies default target and rel attributes', () => {
    const wrapper = mount(Anchor, { props: defaultProps });
    const anchor = wrapper.find('a');

    expect(anchor.attributes('target')).toBe('_self');
    expect(anchor.attributes('rel')).toBe(''); // No rel for _self by default
  });

  it('sets rel="noopener noreferrer" for target="_blank"', () => {
    const wrapper = mount(Anchor, {
      props: { ...defaultProps, target: '_blank' },
    });

    expect(wrapper.find('a').attributes('rel')).toBe('noopener noreferrer');
  });

  it('allows overriding the rel attribute for target="_blank"', () => {
    const wrapper = mount(Anchor, {
      props: { ...defaultProps, target: '_blank', rel: 'custom-rel' },
    });

    expect(wrapper.find('a').attributes('rel')).toBe('custom-rel');
  });

  it('disables the link when the disabled prop is true', async () => {
    const wrapper = mount(Anchor, { props: { ...defaultProps, disabled: true } });
    const anchor = wrapper.find('a');

    // Check for disabled styles
    expect(anchor.classes()).toContain('pointer-events-none');
    expect(anchor.classes()).toContain('opacity-60');

    // Href should be undefined to prevent navigation
    expect(anchor.attributes('href')).toBeUndefined();

    // Test that click events are prevented
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');
    anchor.element.dispatchEvent(clickEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('applies custom classes', () => {
    const wrapper = mount(Anchor, {
      props: { ...defaultProps, customClass: 'my-anchor' },
    });

    expect(wrapper.find('a').classes()).toContain('my-anchor');
  });
});
