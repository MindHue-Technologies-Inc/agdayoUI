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

  // -- ACTIONS --
  const validateName = () => {
    if (!name.value) {
      warningToast.value.message = "Please Enter the Trip Name";
      return false
    }
    return true
  }

  const validateLocation = () => {
    if (!location.value) {
      warningToast.value.message = "Please Enter a Location"
      return false
    }
    return true
  }

  const validateDate = () => {
    if (!date.value.start && !date.value.end) {
      warningToast.value.message = "Please Enter a Date Range"
      return false
    }
    return true
  }

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
      }

      // -- 4. GET THE ID OF THE NEWLY CREATED TRIP
      const {tripId, tripData} = await response.json()

      window.location.href = `/trips/${tripId}`

    } catch (err) {
      console.error(err)
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