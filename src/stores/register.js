import { atom } from 'nanostores';

// --- Key for localStorage ---
const STORAGE_KEY = 'registerData';

// --- Helper function to check if we are in a browser environment ---
const isBrowser = typeof window !== 'undefined';

// --- Helper function to get initial state from localStorage ---
function getInitialState() {
  if (isBrowser) { // ONLY access localStorage if in a browser
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        // console.log("Loaded from localStorage:", JSON.parse(storedData)); // For debugging
        return JSON.parse(storedData);
      }
    } catch (e) {
      console.error("Failed to parse stored data from localStorage, clearing:", e);
      // It's good practice to clear corrupted data
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  // Default initial state if not in browser or no stored data/error
  return {
    register: false,
    email: '',
    password: '',
    homeProvince: '',
    hasExperience: null,
    spentVacations: [],
    heardUs: '',
  };
}

// --- Initialize the store with data from localStorage ---
export const useRegisterStore = atom(getInitialState());

// --- Subscribe to store changes and save to localStorage (only in browser) ---
if (isBrowser) { // ONLY subscribe if in a browser
  useRegisterStore.listen(value => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save data to localStorage:", e);
    }
  });
}

// --- Exported setter functions ---

export function setEmail(email) {
  useRegisterStore.set({
    ...useRegisterStore.get(),
    email: email,
  });
}

export function setPassword(password) {
  useRegisterStore.set({
    ...useRegisterStore.get(),
    password: password,
  });
}

export function setHomeProvince(homeProvince) {
  useRegisterStore.set({
    ...useRegisterStore.get(),
    homeProvince: homeProvince,
  });
}

export function setSpentVacation(spentVacation) {
  console.log(spentVacation)
  useRegisterStore.set({
    ...useRegisterStore.get(),
    spentVacations: spentVacation,
  });
}

export function setHeardUs(heardUs) {
  useRegisterStore.set({
    ...useRegisterStore.get(),
    heardUs: heardUs,
  });
}

export function setHasExperience(hasExperience) {
  useRegisterStore.set({
    ...useRegisterStore.get(),
    hasExperience: hasExperience,
  });
}

// Optional: A reset function
export function resetRegisterStore() {
  const defaultState = {
    register: false,
    email: '',
    password: '',
    homeProvince: '',
    hasExperience: null,
    spentVacations: [],
    heardUs: '',
  };
  useRegisterStore.set(defaultState);
}