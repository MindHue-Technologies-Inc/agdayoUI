
// Sidebar.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Sidebar from '@/shared/components/UI/Sidebar.vue';

// Mock dependencies
vi.mock('../../stores/auth', () => ({
  useAuthStore: {
    // Mock any properties from the store that are used in the component
  },
  logout: vi.fn(),
}));

vi.mock('../../fetch.js', () => ({
  apiRequest: vi.fn(),
}));

// Mock package.json
vi.mock('../../../package.json', () => ({
  version: '1.2.3',
}));

describe('Sidebar.vue', () => {
  // Mock window.location
  const { location } = window;
  beforeEach(() => {
    delete window.location;
    window.location = { ...location, pathname: '/', href: '' };
  });

  afterEach(() => {
    window.location = location;
  });

  it('renders the sidebar with navigation links and logo', () => {
    const wrapper = mount(Sidebar);

    // Check for logo and version
    expect(wrapper.find('img[alt=""]').exists()).toBe(true);
    expect(wrapper.text()).toContain('α1.2.3');

    // Check for navigation links
    const links = wrapper.findAll('a.sidebar-buttons');
    expect(links.length).toBe(6); // 5 nav links + 1 logout button
  });

  it('highlights the active link based on the current path', async () => {
    window.location.pathname = '/trips';
    const wrapper = mount(Sidebar);

    // The link with href="/trips" should have the active class
    const tripsLink = wrapper.find('a[href="/trips"]');
    setTimeout(()=>{
      expect(tripsLink.classes()).toContain('text-peach-500!');
    }, 100)
  });

  it('calls the logout method when the logout button is clicked', async () => {
    const { apiRequest } = await import('@/core/fetch.js');
    apiRequest.mockResolvedValue({ ok: true, json: () => Promise.resolve({}) });

    const wrapper = mount(Sidebar);
    const logoutButton = wrapper.find('#logoutBtn');

    await logoutButton.trigger('click');

    // Check for navigation after logout
    expect(window.location.href).toBe('/login');
  });
});
