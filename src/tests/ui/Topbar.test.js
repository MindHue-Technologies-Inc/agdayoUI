
// Topbar.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Topbar from '../../components/UI/Topbar.vue';

describe('Topbar.vue', () => {
  // Mock window.history.back()
  const historyBackSpy = vi.spyOn(window.history, 'back').mockImplementation(() => {});

  it('renders with a title', () => {
    const wrapper = mount(Topbar, { props: { title: 'My Title' } });
    expect(wrapper.text()).toContain('My Title');
  });

  it('shows the back button by default', () => {
    const wrapper = mount(Topbar, { props: { title: 'My Title' } });
    expect(wrapper.find('.ph-caret-left').exists()).toBe(true);
  });

  it('hides the back button when hideBackButton is true', () => {
    const wrapper = mount(Topbar, { props: { title: 'My Title', hideBackButton: true } });
    expect(wrapper.find('.ph-caret-left').exists()).toBe(false);
  });

  it('calls window.history.back when the back button is clicked', async () => {
    const wrapper = mount(Topbar, { props: { title: 'My Title' } });
    await wrapper.find('.ph-caret-left').trigger('click');
    expect(historyBackSpy).toHaveBeenCalled();
  });
});
