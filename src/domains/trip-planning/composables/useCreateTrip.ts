import { ref, computed, onMounted } from "vue";

export function useCreateTrip() {
  // -- STATES --
  const dangerToast = ref({message: ""})
  const warningToast = ref({message: ""})
  const name = ref("")
  const location = ref("")
  const date = ref({
    start: null,
    end: null,
  })
  const btnLoading = ref(false)
  const unsubscribeFromDbStore = ref(null)

  // -- HELPERS --
  const showWarning = (message: string) => {
    warningToast.value.message = message;
  };

  // -- ACTIONS --
  // -- VALIDATION --
  const validateName = () => !!name.value || (showWarning("Please Enter the Trip Name"), false);
  const validateLocation = () => !!location.value || (showWarning("Please Enter a Location"), false);
  const validateDate = () => (date.value.start && date.value.end) || (showWarning("Please Enter a Date Range"), false);

  const saveTrip = async () => {
    // -- 1. VALIDATE INPUTS
    if (!validateName()) return;
    if (!validateLocation()) return;
    if (!validateDate()) return;

    try {
      btnLoading.value = true;
      // 1.5 CONSTRUCT TRIP PAYLOAD
      const payload = {
        name: name.value,
        date: date.value,
        location: location.value,
      }

      // -- 2. CALL POST API
      const response = await fetch('/api/v1/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      // -- 3. CHECK IF RESPONSE IS NOT GOOD
      if (!response.ok) {
        const error = await response.json()
        console.error('Something went wrong', error.message)
        throw new Error(error)
      }

      // -- 4. GET THE ID OF THE NEWLY CREATED TRIP
      const {tripId, tripData} = await response.json()

      window.location.href = `/trips/${tripId}`

    } catch (err) {
      console.error(err)
    } finally {
      btnLoading.value = false
    }
  }

  return {
    dangerToast,
    warningToast,
    name,
    location,
    date,
    btnLoading,
    unsubscribeFromDbStore,
    validateName,
    validateDate,
    validateLocation,
    saveTrip,
  }
}