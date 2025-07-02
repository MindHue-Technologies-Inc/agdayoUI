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
    trips: [
      {
        name: '',
        date: {
          start: null,
          end: null,
        },
        location: '',
      }
    ]
  }
}