import {ref, reactive} from "vue";

function formatIsoDateToDate(v:any) {
  return new Date(v).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const useActivities = () => {
  const groupedActivities = (activities:any) => {
    const result:any[] = [];
    let currentDay:any = null;
    activities.forEach((activity:any) => {
      const date = new Date(activity.datetime);
      const day = activity.datetime.split("T")[0];

      if (day !== currentDay) {
        currentDay = day;
        result.push({
          type: "day",
          label: formatIsoDateToDate(date),
          iso: day,
        })
      }

      result.push({type: "activity", date: activity});
    });
    return result;
  }
}