
// DateRange.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DateRange from '../../components/UI/DateRange.vue';

describe('DateRange.vue', () => {

  it('changes month when the navigation buttons are clicked', async () => {
    const wrapper = mount(DateRange);
    const initialMonth = wrapper.vm.selectedMonth;

    // Go to next month
    await wrapper.find('button:last-of-type').trigger('click');
    expect(wrapper.vm.selectedMonth).toBe((initialMonth + 1) % 12);

    // Go to previous month
    await wrapper.find('button:first-of-type').trigger('click');
    expect(wrapper.vm.selectedMonth).toBe(initialMonth);
  });

  it('selects a start and end date', async () => {
    const wrapper = mount(DateRange);
    const days = wrapper.findAll('.grid-cols-7 .flex > div[class*="cursor-pointer"]');

    // Select start date (e.g., the 10th)
    await days[10].trigger('click');
    expect(wrapper.vm.startDate).not.toBeNull();
    expect(wrapper.vm.endDate).toBeNull();
    let emitted = wrapper.emitted('update:range');
    expect(emitted).toBeTruthy();
    expect(emitted[emitted.length - 1][0].start).not.toBeNull();

    // Select end date (e.g., the 15th)
    await days[15].trigger('click');
    expect(wrapper.vm.endDate).not.toBeNull();
    emitted = wrapper.emitted('update:range');
    expect(emitted[emitted.length - 1][0].end).not.toBeNull();

    // Check if the dates have the correct classes
    expect(days[10].classes()).toContain('bg-peach-400');
    expect(days[15].classes()).toContain('bg-peach-400');
    // Check a date in between
    expect(days[12].classes()).toContain('bg-peach-100');
  });

  it('resets the selection when a third date is clicked', async () => {
    const wrapper = mount(DateRange);
    const days = wrapper.findAll('.grid-cols-7 .flex > div[class*="cursor-pointer"]');

    await days[10].trigger('click'); // Start
    await days[15].trigger('click'); // End
    await days[20].trigger('click'); // New start

    expect(wrapper.vm.endDate).toBeNull();
    expect(wrapper.vm.startDate.getDate()).toBe(wrapper.vm.paddedDays[20].getDate());
  });

  it('reflects the external `range` prop', async () => {
    const startDate = new Date(2024, 5, 10); // June 10, 2024
    const endDate = new Date(2024, 5, 15);
    const wrapper = mount(DateRange, {
      props: {
        range: { start: startDate, end: endDate },
      },
    });

    // Check if internal state matches prop
    expect(wrapper.vm.startDate).toEqual(startDate);
    expect(wrapper.vm.endDate).toEqual(endDate);

    // Check if calendar view updated to show the start date
    expect(wrapper.vm.selectedMonth).toBe(5);
    expect(wrapper.vm.selectedYear).toBe(2024);
  });
});
