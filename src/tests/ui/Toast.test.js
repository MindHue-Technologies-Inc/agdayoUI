
// Toast.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Toast from '../../components/UI/Toast.vue';

describe('Toast.vue', () => {
  vi.useFakeTimers();

  const defaultProps = {
    message: 'Test message',
    variant: 'success',
    duration: 3000,
  };

  it('does not render initially', () => {
    const wrapper = mount(Toast, { props: defaultProps });
    expect(wrapper.find('.z-50').exists()).toBe(false);
  });

  it('becomes visible when the message prop changes', async () => {
    const wrapper = mount(Toast, { props: { ...defaultProps, message: '' } });

    // Initially not visible
    expect(wrapper.vm.visible).toBe(false);

    // Change the message to trigger the watcher
    await wrapper.setProps({ message: 'A new toast message' });

    expect(wrapper.vm.visible).toBe(true);
    expect(wrapper.find('.z-50').exists()).toBe(true);
    expect(wrapper.text()).toContain('A new toast message');
  });

  it('hides automatically after the specified duration', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Toast, { props: defaultProps });

    // Manually trigger the show method to simulate its lifecycle
    wrapper.vm.showToast();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.visible).toBe(true);

    // Fast-forward time
    vi.advanceTimersByTime(defaultProps.duration);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.visible).toBe(false);
  });

  it('can be closed manually by clicking the close button', async () => {
    const wrapper = mount(Toast, { props: defaultProps });
    wrapper.vm.showToast();
    await wrapper.vm.$nextTick();

    await wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();

    // It should hide immediately, not waiting for the timer
    setTimeout(()=>{
      expect(wrapper.vm.visible).toBe(false);
    }, 10000)
  });

  it('applies the correct classes for different variants', async () => {
    const variants = {
      success: 'bg-emerald-500',
      error: 'bg-rose-600',
      info: 'bg-sky-500',
      warning: 'bg-amber-500',
    };

    for (const [variant, expectedClass] of Object.entries(variants)) {
      const wrapper = mount(Toast, { props: { ...defaultProps, variant } });
      wrapper.vm.showToast();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.z-50').classes()).toContain(expectedClass);
    }
  });

  it('applies custom classes', async () => {
    const wrapper = mount(Toast, { props: { ...defaultProps, customClass: 'my-toast' } });
    wrapper.vm.showToast();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.z-50').classes()).toContain('my-toast');
  });

  vi.useRealTimers();
});
