import {store} from "../sharedData.js";

export function getNearestDate(array) {
  return array.sort((a, b) => new Date(a) - new Date(b));
}
export function batchTimetables(arrayOfTimetableIds){
  let batchedTimetable={};
  arrayOfTimetableIds.forEach(x=>{
    if(store.timetable.hasOwnProperty(x))
    batchedTimetable={...batchedTimetable,[x]:store.timetable[x]}
  })
  return batchedTimetable;
}