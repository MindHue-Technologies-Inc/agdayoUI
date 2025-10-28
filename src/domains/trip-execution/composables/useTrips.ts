import { ref, computed, onMounted } from "vue";

export function useTrips() {
  const trips = ref<any[]>([]);
  const isLoading = ref<boolean>(true);

  // Fetch trips from API
  const fetchTrips = async () => {
    isLoading.value = true;
    try {
      const response = await fetch("/api/v1/active-trips");
      if (!response.ok) {
        console.error(`Failed to fetch trips: ${response.statusText}`);
        trips.value = [];
        return;
      }

      trips.value = await response.json();;
    } catch (error) {
      console.error("Error fetching trips:", error);
      trips.value = [];
    } finally {
      isLoading.value = false;
    }
  };


  // Determine trip status
  const checkUpcoming = (dateStart: string, dateEnd: string) => {
    const currentDate = new Date();
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    endDate.setDate(endDate.getDate() + 1); // include end day

    if (currentDate < startDate) return "Upcoming";
    if (startDate <= currentDate && currentDate < endDate) return "Active";
    if (endDate < currentDate) return "Completed";
  };

  // Computed properties
  const activeTrips = computed(() =>
      trips.value.filter((trip) => checkUpcoming(trip.date.start, trip.date.end) === "Active")
  );

  const upcomingTrips = computed(() =>
      trips.value.filter((trip) => checkUpcoming(trip.date.start, trip.date.end) === "Upcoming")
  );

  const companions = computed(() =>
      [...new Set(activeTrips.value.map((trip) => trip.companionsUids).flat())]
  );

  onMounted(fetchTrips);

  return {
    trips,
    isLoading,
    activeTrips,
    upcomingTrips,
    companions,
  };
}
