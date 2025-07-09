
// Sheet.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Sheet from '../../components/UI/Sheet.vue';

describe('Sheet.vue', () => {
  const defaultProps = {
    modelValue: true,
  };

  it('renders when modelValue is true', () => {
    const wrapper = mount(Sheet, { props: defaultProps });
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(true);
    expect(wrapper.find('.bg-white').exists()).toBe(true);
  });

  it('does not render when modelValue is false', () => {
    const wrapper = mount(Sheet, { props: { modelValue: false } });
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(false);
  });

  it('closes when the overlay is clicked', async () => {
    const wrapper = mount(Sheet, { props: defaultProps });
    await wrapper.find('.fixed.inset-0').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([{showSheet: false}]);
  });

  it('does not close on overlay click when closeOnClickOutside is false', async () => {
    const wrapper = mount(Sheet, { props: { ...defaultProps, closeOnClickOutside: false } });
    await wrapper.find('.fixed.inset-0').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('renders the default slot content', () => {
    const wrapper = mount(Sheet, {
      props: defaultProps,
      slots: {
        default: '<p>Sheet Content</p>',
      },
    });
    expect(wrapper.html()).toContain('<p>Sheet Content</p>');
  });

  it('shows the drag handle by default and hides it when showHandle is false', () => {
    const wrapper = mount(Sheet, { props: defaultProps });
    expect(wrapper.find('.cursor-grab').exists()).toBe(true);

    const noHandleWrapper = mount(Sheet, { props: { ...defaultProps, showHandle: false } });
    expect(noHandleWrapper.find('.cursor-grab').exists()).toBe(false);
  });

  // Drag functionality is complex to test in JSDOM. These are basic sanity checks.
  describe('Drag to dismiss', () => {
    it('emits close event if dragged beyond the threshold', async () => {
      const wrapper = mount(Sheet, { props: { ...defaultProps, dragThreshold: 50 } });
      const handle = wrapper.find('.cursor-grab');

      // Simulate drag start
      await handle.trigger('mousedown', { clientY: 100 });

      // Simulate drag move
      const moveEvent = new MouseEvent('mousemove', { clientY: 200 });
      window.dispatchEvent(moveEvent);
      await wrapper.vm.$nextTick();

      // Simulate drag end
      const upEvent = new MouseEvent('mouseup');
      window.dispatchEvent(upEvent);
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    });

    it('does not emit close event if not dragged beyond the threshold', async () => {
        const wrapper = mount(Sheet, { props: { ...defaultProps, dragThreshold: 150 } });
        const handle = wrapper.find('.cursor-grab');
  
        // Simulate drag start
        await handle.trigger('mousedown', { clientY: 100 });
  
        // Simulate drag move
        const moveEvent = new MouseEvent('mousemove', { clientY: 200 });
        window.dispatchEvent(moveEvent);
        await wrapper.vm.$nextTick();
  
        // Simulate drag end
        const upEvent = new MouseEvent('mouseup');
        window.dispatchEvent(upEvent);
        await wrapper.vm.$nextTick();
  
        expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      });
  });
});
