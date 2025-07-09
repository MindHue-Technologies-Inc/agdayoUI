// AdvInput.test.js (or .ts)
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AdvInput from "../../components/UI/AdvInput.vue";

// Mock requestAnimationFrame for transition tests (optional but good practice)
// This prevents actual browser rendering cycles from affecting test speed.
global.requestAnimationFrame = vi.fn(cb => cb());

describe('AdvInput.vue', () => {
  // Define default props for convenience
  const defaultProps = {
    label: 'Test Label',
    summary: 'Test Summary',
    icon: 'ph-info', // Default Phosphor icon
  };

  // Reset mocks or state before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with initial props and is collapsed by default', () => {
    const wrapper = mount(AdvInput, {
      props: {...defaultProps}
    });

    // Check if label and summary are rendered
    expect(wrapper.find('.header-text span').text()).toBe(defaultProps.label);
    expect(wrapper.find('.md\\:block.hidden').text()).toBe(defaultProps.summary);

    // Check if icon is rendered correctly (assuming 'ph-info' is a Phosphor icon)
    expect(wrapper.find('i.ph.ph-info').exists()).toBe(true);

    // Check initial state: not expanded, content hidden
    expect(wrapper.vm.isExpanded).toBe(false);
  });

  it('renders custom icon string if not a phosphor icon class', () => {
    const wrapper = mount(AdvInput, {
      props: {
        ...defaultProps,
        icon: 'Custom Icon Text',
      },
    });

    // Should render a span with the custom text, not an <i> tag
    expect(wrapper.find('.header-text span:first-child').text()).toBe('Custom Icon Text');
    expect(wrapper.find('i.ph').exists()).toBe(false);
  });

  it('toggles expansion when header is clicked', async () => {
    const wrapper = mount(AdvInput, { props: defaultProps });
    const header = wrapper.find('.cursor-pointer > div'); // The div with @click="toggle"

    // Initial state: collapsed
    expect(wrapper.vm.isExpanded).toBe(false);
    expect(wrapper.find('.header-text').classes()).not.toContain('expanded');

    // Click to expand
    await header.trigger('click');
    expect(wrapper.vm.isExpanded).toBe(true);
    // v-show toggles display: none;
    expect(wrapper.find('.header-text').classes()).toContain('expanded');
    expect(wrapper.find('.md\\:block.hidden').exists()).toBe(false); // Summary should be hidden when expanded

    // Click to collapse again
    await header.trigger('click');
    expect(wrapper.vm.isExpanded).toBe(false);
    expect(wrapper.find('.header-text').classes()).not.toContain('expanded');
    expect(wrapper.find('.md\\:block.hidden').exists()).toBe(true); // Summary should reappear
  });

  it('expands when expand() method is called', async () => {
    const wrapper = mount(AdvInput, { props: defaultProps });

    expect(wrapper.vm.isExpanded).toBe(false);
    await wrapper.vm.expand(); // Directly call the method
    expect(wrapper.vm.isExpanded).toBe(true);
  });

  it('collapses when collapse() method is called', async () => {
    const wrapper = mount(AdvInput, { props: defaultProps });
    // First, expand it
    await wrapper.vm.expand();
    expect(wrapper.vm.isExpanded).toBe(true);

    // Then, collapse it
    await wrapper.vm.collapse(); // Directly call the method
    expect(wrapper.vm.isExpanded).toBe(false);
  });

  it('renders slot content when expanded', async () => {
    const slotContent = '<p>This is the slot content.</p>';
    const wrapper = mount(AdvInput, {
      props: defaultProps,
      slots: {
        default: slotContent,
      },
    });

    // Initially, slot content should not be visible
    expect(wrapper.find('#slot').text()).not.toContain(slotContent);

    // Expand the component
    await wrapper.find('.cursor-pointer > div').trigger('click');

    // Slot content should now be visible
    expect(wrapper.find('#slot').html()).toContain(slotContent);
  });

  // Note: Testing Vue transitions (beforeEnter, enter, afterEnter, leave, afterLeave)
  // directly in unit tests is complex and often brittle as it involves DOM layout
  // and browser rendering specifics (scrollHeight, requestAnimationFrame).
  // It's usually sufficient to test that `v-show` correctly toggles the display
  // based on `isExpanded` and that the methods `expand`/`collapse`/`toggle`
  // correctly update `isExpanded`. The transition hooks themselves are Vue's
  // internal implementation details.
});