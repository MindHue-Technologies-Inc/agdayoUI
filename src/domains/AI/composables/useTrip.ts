import {ref, reactive} from "vue";

export const useTrip = () => {
  const generateTrip = (prompt:any, currentActivities:any) => {
    try {
      // -- PAYLOAD FOR BACKEND GEMINI API
      const payloadToSend = {
        prompt: prompt,
        currentActivities: currentActivities,
      };

      // -- FETCH RESULTS FROM THE BACKEND GEMINI API
      const response = await fetch()
    }
  }
}