// AdvSquareCard.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AdvSquareCard from "../../components/UI/AdvSquareCard.vue";

describe('AdvSquareCard.vue', () => {
  // Define a set of default props for easy re-use in tests
  const defaultProps = {
    iconName: 'ph-suitcase',
    cardName: 'Test Card',
    tagName: 'Test Tag',
    tagVariant: 'blue',
    iconColorVariant: 'blue',
  };

  // Ensure a clean state before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test Case 1: Component renders with basic props
  it('renders with initial props correctly', () => {
    const wrapper = mount(AdvSquareCard, { props: defaultProps });

    // Check if the icon is rendered with the correct class
    expect(wrapper.find('i.ph.ph-suitcase').exists()).toBe(true);

    // Check if the cardName is rendered
    expect(wrapper.find('span.text-base.font-semibold.text-zinc-800').text()).toBe(defaultProps.cardName);

    // Check if the Tag component is rendered with the correct label and variant
    // We can check the prop passed to the Tag component instance
    const tagComponent = wrapper.findComponent({ name: 'Tag' });
    expect(tagComponent.exists()).toBe(true);
    expect(tagComponent.props('label')).toBe(defaultProps.tagName);
    expect(tagComponent.props('variant')).toBe(defaultProps.tagVariant);
  });

  // Test Case 2: Icon color class is applied correctly based on iconColorVariant prop
  it('applies the correct icon color class based on iconColorVariant', () => {
    const wrapper = mount(AdvSquareCard, {
      props: {
        ...defaultProps,
        iconColorVariant: 'green',
      },
    });

    // Check if the icon element has the expected green color class
    expect(wrapper.find('i.ph').classes()).toContain('text-green-500');
    expect(wrapper.find('i.ph').classes()).not.toContain('text-blue-500'); // Ensure old color is not there
  });

  // Test Case 3: Default icon color class is applied if iconColorVariant is not provided or invalid
  it('applies default icon color class if iconColorVariant is not provided or invalid', () => {
    // Test with no iconColorVariant
    let wrapper = mount(AdvSquareCard, {
      props: {
        ...defaultProps,
        iconColorVariant: undefined, // Explicitly set to undefined
      },
    });
    expect(wrapper.find('i.ph').classes()).toContain('text-zinc-900');

    // Test with an invalid iconColorVariant
    wrapper = mount(AdvSquareCard, {
      props: {
        ...defaultProps,
        iconColorVariant: 'invalid-color', // Not in the validator list
      },
    });
    expect(wrapper.find('i.ph').classes()).toContain('text-zinc-900');
  });

  // Test Case 4: Default tagVariant is applied if not provided
  it('applies default tagVariant if not provided', () => {
    const wrapper = mount(AdvSquareCard, {
      props: {
        ...defaultProps,
        tagVariant: undefined, // Explicitly set to undefined
      },
    });

    const tagComponent = wrapper.findComponent({ name: 'Tag' });
    expect(tagComponent.props('variant')).toBe('peach'); // Default value
  });

  // Test Case 5: 'card-click' event is emitted with cardName when clicked
  it('emits "card-click" event with cardName when clicked', async () => {
    const wrapper = mount(AdvSquareCard, { props: defaultProps });

    // Simulate a click on the main div of the component
    await wrapper.trigger('click');

    // Assert that the 'card-click' event was emitted
    expect(wrapper.emitted('card-click')).toBeTruthy();

    // Assert that the emitted event payload is correct
    // emitted() returns an array of arrays, where each inner array is the arguments for one emission
    expect(wrapper.emitted('card-click')[0][0]).toBe(defaultProps.cardName);
  });

  // Test Case 6: Component's base classes are correctly applied
  it('applies base CSS classes correctly', () => {
    const wrapper = mount(AdvSquareCard, { props: defaultProps });

    // Check for some key classes that define the card's look
    const cardClasses = wrapper.classes();
    expect(cardClasses).toContain('flex');
    expect(cardClasses).toContain('flex-col');
    expect(cardClasses).toContain('bg-white');
    expect(cardClasses).toContain('rounded-4xl'); // Assuming this is defined in your Tailwind config
    expect(cardClasses).toContain('shadow-secondary-md');
    expect(cardClasses).toContain('cursor-pointer');
    expect(cardClasses).toContain('hover:shadow-lg');
  });
});