import { atom } from 'nanostores';

// KEY FOR LOCALSTORAGE
const STORAGE_KEY = 'db'

// HELPER FUNCTION TO CHECK IF WE ARE IN A BROWSER ENVIRONMENT
const isBrowser = typeof window !== 'undefined';

// HELPER FUNCTION TO GET INITIAL STATE FROM LOCALSTORAGE

const getInitialState = () => {
  if (isBrowser) {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY)
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (e) {
      console.error('Failed to parse stored data from localStorage, clearing:', e)
      localStorage.remove(STORAGE_KEY)
    }
  }

// DEFAULT INITIAL STATE IF NOT IN BROWSER OR NO STORED DATA/ERROR
  return {
    trips: []
  }
}

// INITIALIZE THE STORE WITH DATA FROM LOCALSTORAGE
export const useDbStore = atom(getInitialState());

// SUBSCRIBE TO STORE CHANGES AND SAVE TO LOCALSTORAGE (ONLY IN BROWSER)
if (isBrowser) {
  useDbStore.listen(value => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));;
    } catch (e) {
      console.error("Failed to save data to localStorage:", e);
    }
  });
}

// --- HELPER FUNCTIONS TO SAVE TO SPECIFIC STATES ---

export function updateTrip(index, updateFn) {
  const currentState = useDbStore.get(); // Get the current entire state object
  const tripsCopy = [...currentState.trips]; // Create a shallow copy of the trips array

  // Ensure the index is valid
  if (index < 0 || index >= tripsCopy.length) {
    console.error(`Invalid trip index: ${index}. Cannot update trip.`);
    return;
  }

  const tripToUpdate = tripsCopy[index];
  // Pass a copy of the trip to updateFn, so updateFn doesn't mutate the original

  // Update the trip in the copied array
  tripsCopy[index] = updateFn(tripToUpdate ? { ...tripToUpdate } : {});

  // Set the store with a brand new state object containing the new trips array
  useDbStore.set({
    ...currentState, // Copy other top-level properties if any (currently none, but good practice)
    trips: tripsCopy,
  });
}

export function setName(index, newName) {
  updateTrip(index,trip => ({
    ...trip,
    name: newName,
  }));
}

export function setLocation(index, newLocation) {
  updateTrip(index, trip => ({
    ...trip,
    location: newLocation,
  }));
}

export function setTheme(index, newTheme) {
  updateTrip(index, trip => ({
    ...trip,
    theme: newTheme,
  }));
}

export function setDate(index, newDate) {
  updateTrip(index, trip => ({
    ...trip,
    date: newDate
  }))
}

export function setPreparation(index, newPrep) {
  updateTrip(index, trip => ({
    ...trip,
    preparation: newPrep
  }))
}

export function setCompanions(index, newCompanions) {
  updateTrip(index, trip => ({
    ...trip,
    companions: { // Assuming the top-level property is `companions`
      ...trip.companions, // Preserve any other properties within companions object
      ...newCompanions // This should be an object, e.g., { companions: [...] }
    }
  }))
}

export function setAccommodation(index, newAccommodationDetails) {
  updateTrip(index, trip => ({
    ...trip,
    accommodation: { // Using 'accommodation' - please ensure your initial state matches
      ...trip.accommodation,
      ...newAccommodationDetails, // newAccommodationDetails can be a partial object
    }
  }))
}

// For Budget
export function setBudget(index, newBudgetDetails) {
  updateTrip(index, trip => ({
    ...trip,
    budget: {
      ...trip.budget,
      ...newBudgetDetails, // newBudgetDetails can be { overall: ..., category: [...] }
    }
  }))
}

export function setTransportation(index, newTransportationDetails) {
  updateTrip(index, trip => ({
    ...trip,
    transportation: {
      ...trip.transportation,
      ...newTransportationDetails, // Merge new details
    },
  }));
}

export function setRoles(index, newRoles) {
  updateTrip(index, trip => ({
    ...trip,
    roles: {
      ...trip.roles, // Preserve existing roles if newRoles is partial
      ...newRoles,
    },
  }));
}

export function setActivities(index, newActivitiesArray) {
  updateTrip(index, trip => ({
    ...trip,
    activities: newActivitiesArray, // newActivitiesArray should be the full updated array
  }));
}

export function setPlanningProgress(index, newProgress) {
  updateTrip(index, trip => ({
    ...trip,
    planningProgress: {
      ...trip.planningProgress, // Preserve existing planningProgress properties
      ...newProgress,
    },
  }));
}

export function addTrip(newTripData) {
  const currentState = useDbStore.get();
  useDbStore.set({
    ...currentState,
    trips: [...currentState.trips, newTripData]
  });
}

export function addEmptyTrip() {
  const currentState = useDbStore.get();
  useDbStore.set({
    ...currentState,
    trips: [...currentState.trips, {}]
  })
  return currentState.trips.length
}

export function removeTrip(index) {
  const currentState = useDbStore.get();
  const tripsCopy = [...currentState.trips];
  if (index >= 0 && index < tripsCopy.length) {
    tripsCopy.splice(index, 1); // Remove the trip
    useDbStore.set({
      ...currentState,
      trips: tripsCopy,
    });
  } else {
    console.warn(`Attempted to remove trip at invalid index: ${index}`);
  }
}

export function resetDbStore() {
  useDbStore.set(getInitialState());
}