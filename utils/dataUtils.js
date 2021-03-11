import {timetablesService} from "../app.js";

export function getNearestDate(array) {
  return array.sort((a, b) => new Date(a) - new Date(b));
}
export function batchTimetables(arrayOfTimetableIds){
  let batchedTimetable=[];
  arrayOfTimetableIds.forEach(x=>{
    if(timetablesService.timetable.hasOwnProperty(x))
    batchedTimetable=[...batchedTimetable,...timetablesService.timetable[x].delay]
  })
  return batchedTimetable;
}