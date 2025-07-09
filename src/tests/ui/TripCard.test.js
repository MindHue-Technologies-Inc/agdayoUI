
// TripCard.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TripCard from '../../components/UI/TripCard.vue';
import Card from '../../components/UI/Card.vue';
import Tag from '../../components/UI/Tag.vue';

// Mock child components
vi.mock('../../components/UI/Card.vue', () => ({ default: { name: 'Card', template: '<div class="mock-card"><slot /></div>' } }));
vi.mock('../../components/UI/Tag.vue', () => ({ default: { name: 'Tag', props: ['label', 'variant'], template: '<span class="mock-tag">{{ label }}</span>' } }));

describe('TripCard.vue', () => {
  const mockTrips = [
    {
      name: 'Summer Adventure',
      date: { start: '2025-08-01', end: '2025-08-10' },
      location: 'Beach',
      theme: 'peach',
      planningProgress: { completed: 3, total: 5 },
    },
    {
      name: 'Winter Getaway',
      date: { start: '2024-01-01', end: '2024-01-05' }, // Past date
      location: 'Mountains',
      theme: 'blue',
      planningProgress: { completed: 5, total: 5 },
    },
    {
      name: 'Active Trip',
      date: { start: '2025-07-01', end: '2025-07-30' }, // Active date
      location: 'City',
      theme: 'emerald',
      planningProgress: { completed: 2, total: 4 },
    },
  ];

  it('renders a card for each trip', () => {
    const wrapper = mount(TripCard, { props: { trips: mockTrips } });
    expect(wrapper.findAll('.mock-card').length).toBe(mockTrips.length);
  });

  it('displays trip name and location', () => {
    const wrapper = mount(TripCard, { props: { trips: [mockTrips[0]] } });
    expect(wrapper.text()).toContain('Summer Adventure');
    expect(wrapper.text()).toContain('Beach');
  });

  it('displays correct status tag for upcoming trip', () => {
    const wrapper = mount(TripCard, { props: { trips: [mockTrips[0]] } });
    expect(wrapper.find('.mock-tag').text()).toBe('Upcoming');
  });

  it('displays correct status tag for completed trip', () => {
    const wrapper = mount(TripCard, { props: { trips: [mockTrips[1]] } });
    expect(wrapper.find('.mock-tag').text()).toBe('Completed');
  });

  it('displays correct status tag for active trip', () => {
    const wrapper = mount(TripCard, { props: { trips: [mockTrips[2]] } });
    expect(wrapper.find('.mock-tag').text()).toBe('Active');
  });

  it('formats date range correctly for single month', () => {
    const wrapper = mount(TripCard, { props: { trips: [mockTrips[0]] } });
    expect(wrapper.find('#date-range').text()).toContain('Aug 1 - 10, 2025');
  });

  it('formats date range correctly for multi-month same year', () => {
    const multiMonthTrip = {
      name: 'New Year Trip',
      date: { start: '2025-12-25', end: '2026-01-05' },
      location: 'Somewhere',
      theme: 'peach',
      planningProgress: { completed: 1, total: 2 },
    };
    const wrapper = mount(TripCard, { props: { trips: [multiMonthTrip] } });
    expect(wrapper.text()).toContain('Dec 25, 2025 - Jan 5, 2026');
  });

  it('applies theme-based classes correctly', () => {
    const wrapper = mount(TripCard, { props: { trips: [mockTrips[0]] } });
    // Check header class
    expect(wrapper.find('div.flex.flex-col.gap-3').classes()).toContain('bg-peach-50');
    // Check progress bar background
    expect(wrapper.find('div.w-full.rounded-full.h-2').classes()).toContain('bg-peach-200');
    // Check progress bar fill
    expect(wrapper.find('div.h-2.rounded-full').classes()).toContain('bg-peach-200');
    // Check text color
    expect(wrapper.find('i.ph-calendar-dots').classes()).toContain('text-peach-500');
  });

  it('links to the correct trip detail page', () => {
    const wrapper = mount(TripCard, { props: { trips: [mockTrips[0]] } });
    expect(wrapper.find('a').attributes('href')).toBe('/trips/0');
  });

  it('uses actualIndex prop if provided', () => {
    const wrapper = mount(TripCard, { props: { trips: [mockTrips[0]], actualIndex: [123] } });
    expect(wrapper.find('a').attributes('href')).toBe('/trips/123');
  });
});
