import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import TripIndex from '../../../components/pages/trip/index.vue';
import {
  useDbStore,
  setName,
  setLocation,
  setDate,
  setTheme,
  setPreparation,
  setCompanions,
  setAccommodation,
  setBudget,
  setTransportation,
  setRoles,
  setActivities,
  setPlanningProgress,
  removeTrip,
} from '../../../stores/db.js';

// -- INITIALIZE MOCK DB
vi.mock('../../../stores/db.js', () => {

  // -- OBJECT FOR MOCK TRIPS
  const mockTrips = [
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
  ];

  // -- USE DB STORE TO MOCK
  const mockUseDbStore = {
    get: vi.fn(() => ({
      trips: mockTrips,
    })),
    listen: vi.fn(() => vi.fn()), // Mock listen to return an unsubscribe function
  };

  // -- RETURNS THE MOCK ELEMENTS
  return {
    useDbStore: mockUseDbStore,
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
  };
});

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

// -- START OF TEST
describe('TripIndex.vue', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    // Mock window.confirm and window.location for specific tests
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    });
  });

  // -- TEST 1: CHECK IF CARD RENDERS
  it('renders Card component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'Card' }).exists()).toBe(true);
  });

  // -- TEST 2: CHECK IF TripDetailsHeader RENDERS
  it('renders TripDetailsHeader component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'TripDetailsHeader' }).exists()).toBe(true);
  });

  // -- TEST 3: CHECK IF TripSections RENDERS
  it('renders TripSections component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'TripSections' }).exists()).toBe(true);
  });

  // -- TEST 4: CHECK IF ActivityTimeline RENDERS
  it('renders ActivityTimeline component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'ActivityTimeline' }).exists()).toBe(true);
  });

  // -- TEST 5: CHECK IF ToastContainer RENDERS
  it('renders ToastContainer component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'ToastContainer' }).exists()).toBe(true);
  });

  // -- TEST 6: CHECK IF Toast RENDERS
  it('renders Toast component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    // There are two Toast components, so we check for at least one
    expect(wrapper.findAllComponents({ name: 'Toast' }).length).toBeGreaterThanOrEqual(1);
  });

  // -- TEST 7: CHECK IF SheetTripSettings RENDERS
  it('renders SheetTripSettings component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetTripSettings' }).exists()).toBe(true);
  });

  // -- TEST 8: CHECK IF SheetPreparation RENDERS
  it('renders SheetPreparation component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetPreparation' }).exists()).toBe(true);
  });

  // -- TEST 9: CHECK IF SheetAccom RENDERS
  // -- TEST 9: CHECK IF SheetAccom RENDERS
  it('renders SheetAccom component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetAccom' }).exists()).toBe(true);
  });

  // -- TEST 10: CHECK IF SheetCompanions RENDERS
  // -- TEST 10: CHECK IF SheetCompanions RENDERS
  it('renders SheetCompanions component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetCompanions' }).exists()).toBe(true);
  });

  // -- TEST 11: CHECK IF SheetBudget RENDERS
  // -- TEST 11: CHECK IF SheetBudget RENDERS
  it('renders SheetBudget component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetBudget' }).exists()).toBe(true);
  });

  // -- TEST 12: CHECK IF SheetTransportation RENDERS
  // -- TEST 12: CHECK IF SheetTransportation RENDERS
  it('renders SheetTransportation component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetTransportation' }).exists()).toBe(true);
  });

  // -- TEST 13: CHECK IF SheetRoles RENDERS
  // -- TEST 13: CHECK IF SheetRoles RENDERS
  it('renders SheetRoles component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetRoles' }).exists()).toBe(true);
  });

  // -- TEST 14: CHECK IF SheetAddActivity RENDERS
  // -- TEST 14: CHECK IF SheetAddActivity RENDERS
  it('renders SheetAddActivity component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetAddActivity' }).exists()).toBe(true);
  });

  // -- TEST 15: CHECK IF SheetEditActivity RENDERS
  // -- TEST 15: CHECK IF SheetEditActivity RENDERS
  it('renders SheetEditActivity component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetEditActivity' }).exists()).toBe(true);
  });

  // -- TEST 16: CHECK IF SheetViewActivity RENDERS
  // -- TEST 16: CHECK IF SheetViewActivity RENDERS
  it('renders SheetViewActivity component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetViewActivity' }).exists()).toBe(true);
  });

  // -- TEST 17: CHECK IF SheetDayNote RENDERS
  // -- TEST 17: CHECK IF SheetDayNote RENDERS
  it('renders SheetDayNote component', () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });
    expect(wrapper.findComponent({ name: 'SheetDayNote' }).exists()).toBe(true);
  });

  // -- TEST 18: deleteTrip method calls removeTrip and redirects
  // -- TEST 18: deleteTrip method calls removeTrip and redirects
  it('calls removeTrip and redirects when deleteTrip is confirmed', async () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });

    await wrapper.vm.deleteTrip();

    expect(window.confirm).toHaveBeenCalledWith('Do you want to delete this trip?');
    expect(removeTrip).toHaveBeenCalledWith(0);
    expect(window.location.href).toBe('/trips');
  });

  // -- TEST 19: addNewActivity method adds activity and shows toast
  // -- TEST 19: addNewActivity method adds activity and shows toast
  it('adds a new activity and shows success toast', async () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });

    const newActivity = { id: 'new_act_1', name: 'New Activity' };
    await wrapper.vm.addNewActivity(newActivity);

    expect(wrapper.vm.activities).toContainEqual(newActivity);
    expect(wrapper.vm.successToast.message).toBe('Activity Added');
    expect(setActivities).toHaveBeenCalledWith(0, expect.any(Array));
  });

  // -- TEST 20: updateActivity method updates existing activity
  // -- TEST 20: updateActivity method updates existing activity
  it('updates an existing activity', async () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });

    const existingActivity = { id: 'act_foodie_002', name: 'Old Name', location: 'Old Location' };
    wrapper.vm.activities.push(existingActivity); // Add a mock activity

    const updatedActivity = { id: 'act_foodie_002', name: 'New Name', location: 'New Location' };
    await wrapper.vm.updateActivity(updatedActivity);

    const activityInVm = wrapper.vm.activities.find(a => a.id === updatedActivity.id);
    expect(activityInVm.name).toBe('New Name');
    expect(activityInVm.location).toBe('New Location');
    expect(setActivities).toHaveBeenCalledWith(0, expect.any(Array));
  });

  // -- TEST 21: deleteActivity method deletes an activity
  // -- TEST 21: deleteActivity method deletes an activity
  it('deletes an activity', async () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });

    const activityToDelete = { id: 'act_to_delete', name: 'Activity to Delete' };
    wrapper.vm.activities.push(activityToDelete);

    await wrapper.vm.deleteActivity('act_to_delete');

    expect(wrapper.vm.activities).not.toContainEqual(activityToDelete);
    expect(setActivities).toHaveBeenCalledWith(0, expect.any(Array));
  });

  // -- TEST 22: saveSettings method updates trip config and store
  // -- TEST 22: saveSettings method updates trip config and store
  it('saves settings and updates store', async () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });

    const newSettings = {
      name: 'Updated Trip Name',
      location: 'Updated Location',
      theme: 'blue',
      date: {
        start: new Date('2025-08-01'),
        end: new Date('2025-08-10'),
      },
    };

    await wrapper.vm.saveSettings(newSettings);

    expect(wrapper.vm.tripConfig.name).toBe(newSettings.name);
    expect(wrapper.vm.tripConfig.location).toBe(newSettings.location);
    expect(wrapper.vm.tripConfig.theme).toBe(newSettings.theme);
    expect(wrapper.vm.tripConfig.date.start).toEqual(newSettings.date.start);
    expect(wrapper.vm.tripConfig.date.end).toEqual(newSettings.date.end);

    expect(setName).toHaveBeenCalledWith(0, newSettings.name);
    expect(setLocation).toHaveBeenCalledWith(0, newSettings.location);
    expect(setTheme).toHaveBeenCalledWith(0, newSettings.theme);
    expect(setDate).toHaveBeenCalledWith(0, newSettings.date);
  });

  // -- TEST 23: no-scroll class added/removed based on sheet visibility
  // -- TEST 23: no-scroll class added/removed based on sheet visibility
  it('adds no-scroll class to body when any sheet is open', async () => {
    const wrapper = mount(TripIndex, {
      props: {
        index: 0,
      },
    });

    expect(document.body.classList.contains('no-scroll')).toBe(false);

    wrapper.vm.settingsShowSheet = true;
    await wrapper.vm.$nextTick();
    expect(document.body.classList.contains('no-scroll')).toBe(true);

    wrapper.vm.settingsShowSheet = false;
    await wrapper.vm.$nextTick();
    expect(document.body.classList.contains('no-scroll')).toBe(false);
  });
});