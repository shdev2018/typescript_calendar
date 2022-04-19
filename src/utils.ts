import dayjs from 'dayjs'
import { type } from 'os';

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
         currentMonthCount++;
         return dayjs(new Date(year, month, currentMonthCount));
      })
  });
  return daysMatrix;
}

export interface CalendarEvent {
  title: string;
  description: string;
  label: string | undefined;
  day: number | undefined,
  id: number
}