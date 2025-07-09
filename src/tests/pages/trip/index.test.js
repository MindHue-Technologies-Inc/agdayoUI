import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TripIndex from '../../../components/pages/trip/index.vue';

// Mock the db store to prevent actual store interactions during tests
vi.mock('../../../stores/db.js', () => ({
  useDbStore: {
    get: vi.fn(() => ({
      trips: [
        {
          name: 'Test Trip',
          location: 'Test Location',
          date: { start: new Date(), end: new Date() },
          theme: 'peach',
          preparation: {},
          budget: {},
          activities: [],
          accommodation: {},
        },
      ],
    })),
    listen: vi.fn(() => vi.fn()), // Mock listen to return an unsubscribe function
  },
  setName: vi.fn(),
  setLocation: vi.fn(),
  setDate: vi.fn(),
  setTheme: vi.fn(),
  setPreparation: vi.fn(),
  setCompanions: vi.fn(),
  setAccommodation: vi.fn(),
  setBudget: vi.fn(),
  setTransportation: vi.fn(),
  setRoles: vi.fn(),
  setActivities: vi.fn(),
  setPlanningProgress: vi.fn(),
  removeTrip: vi.fn(),
}));

// Mock child components to simplify testing and avoid deep rendering issues
vi.mock('../../../components/UI/Card.vue', () => ({
  default: {
    name: 'Card',
    template: '<div class="mock-card"><slot /></div>',
  },
}));
vi.mock('../../../components/UI/ToastContainer.vue', () => ({
  default: {
    name: 'ToastContainer',
    template: '<div class="mock-toast-container"><slot /></div>',
  },
}));
vi.mock('../../../components/UI/Toast.vue', () => ({
  default: {
    name: 'Toast',
    template: '<div class="mock-toast"></div>',
  },
}));
vi.mock('../../../components/pages/trip/components/TripDetailsHeader.vue', () => ({
  default: {
    name: 'TripDetailsHeader',
    template: '<div class="mock-trip-details-header"></div>',
  },
}));
vi.mock('../../../components/pages/trip/components/TripSections.vue', () => ({
  default: {
    name: 'TripSections',
    template: '<div class="mock-trip-sections"></div>',
  },
}));
vi.mock('../../../components/pages/trip/components/ActivityTimeline.vue', () => ({
  default: {
    name: 'ActivityTimeline',
    template: '<div class="mock-activity-timeline"></div>',
  },
}));
vi.mock('../../../components/pages/trip/components/sheets/SheetTripSettings.vue', () => ({
  default: {
    name: 'SheetTripSettings',
    template: '<div class="mock-sheet-trip-settings"></div>',
  },
}));
vi.mock('../../../components/pages/trip/components/sheets/SheetPreparation.vue', () => ({
  default: {
    name: 'SheetPreparation',
    template: '<div class="mock-sheet-preparation"></div>',
  },
}));
vi.mock('../../../components/pages/trip/components/sheets/SheetAccom.vue', () => ({
  default: {
    name: 'SheetAccom',
    template: '<div class="mock-sheet-accom"></div>',
  },
}));
vi.mock('../../../components/pages/trip/components/sheets/SheetCompanions.vue', () => ({
  default: {
    name: 'SheetCompanions',
    template: '<div class="mock-sheet-companions"></div>',
  },
}));
vi.mock('../../../components/pages/trip/components/sheets/SheetBudget.vue', () => ({
  default: {
    name: 'SheetBudget',
    template: '<div class="mock-sheet-budget"></div>',
  },
}));
vi.mock('../../../components/pages/trip/components/sheets/SheetTransportation.vue', () => ({
  default: {
    name: 'SheetTransportation',
    template: '<div class="mock-sheet-transportation"></div>',
  },
}));
vi.mock('../../../components/pages/trip/components/sheets/SheetRoles.vue', () => ({
  default: {
    name: 'SheetRoles',
    template: '<div class="mock-sheet-roles"></div>',
  },
}));
vi.mock('../../../components/pages/trip/components/sheets/SheetAddActivity.vue', () => ({
  default: {
    name: 'SheetAddActivity',
    template: '<div class="mock-sheet-add-activity"></div>',
  },
}));
vi.mock('../../../components/pages/trip/components/sheets/SheetEditActivity.vue', () => ({
  default: {
    name: 'SheetEditActivity',
    template: '<div class="mock-sheet-edit-activity"></div>',
  },
}));
vi.mock('../../../components/pages/trip/components/sheets/SheetViewActivity.vue', () => ({
  default: {
    name: 'SheetViewActivity',
    template: '<div class="mock-sheet-view-activity"></div>',
  },
}));
vi.mock('../../../components/pages/trip/components/sheets/SheetDayNote.vue', () => ({
  default: {
    name: 'SheetDayNote',
    template: '<div class="mock-sheet-day-note"></div>',
  },
}));


describe('TripIndex.vue', () => {
  it('renders Card component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'Card' }).exists()).toBe(true);
  });

  it('renders TripDetailsHeader component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'TripDetailsHeader' }).exists()).toBe(true);
  });

  it('renders TripSections component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'TripSections' }).exists()).toBe(true);
  });

  it('renders ActivityTimeline component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'ActivityTimeline' }).exists()).toBe(true);
  });

  it('renders ToastContainer component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'ToastContainer' }).exists()).toBe(true);
  });

  it('renders Toast component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    // There are two Toast components, so we check for at least one
    expect(wrapper.findAllComponents({ name: 'Toast' }).length).toBeGreaterThanOrEqual(1);
  });

  it('renders SheetTripSettings component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetTripSettings' }).exists()).toBe(true);
  });

  it('renders SheetPreparation component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetPreparation' }).exists()).toBe(true);
  });

  it('renders SheetAccom component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetAccom' }).exists()).toBe(true);
  });

  it('renders SheetCompanions component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetCompanions' }).exists()).toBe(true);
  });

  it('renders SheetBudget component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetBudget' }).exists()).toBe(true);
  });

  it('renders SheetTransportation component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetTransportation' }).exists()).toBe(true);
  });

  it('renders SheetRoles component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetRoles' }).exists()).toBe(true);
  });

  it('renders SheetAddActivity component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetAddActivity' }).exists()).toBe(true);
  });

  it('renders SheetEditActivity component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetEditActivity' }).exists()).toBe(true);
  });

  it('renders SheetViewActivity component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetViewActivity' }).exists()).toBe(true);
  });

  it('renders SheetDayNote component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetDayNote' }).exists()).toBe(true);
  });
});
