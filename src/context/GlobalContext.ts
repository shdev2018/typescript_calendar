import dayjs from 'dayjs';
import React from 'react'
import { CalendarEvent } from '../utils';

interface GlobalContext {
  monthIndex: number;
  setMonthIndex: (index: any) => void;
  smallCalendarMonth: number;
  setSmallCalendarMonth: (index: any) => void;
  daySelected: dayjs.Dayjs | null;
  setDaySelected: (day: any) => void;
  showEventModal: boolean;
  setShowEventModal: (show: boolean) => void;
  dispatchCalEvent: ({type, payload}: any) => void;
  savedEvents: Array<CalendarEvent>;
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent) => void;
  labels: Array<any>;
  setLabels: (lbls: any) => void;
  updateLabel: (lbl: any) => void;
  filteredEvents: Array<any>
}

const GlobalContext= React.createContext<GlobalContext>({
  monthIndex: 0,
  setMonthIndex: (index: any) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index: number) => {},
  daySelected: null,
  setDaySelected: (day: any) => {},
  showEventModal: false,
  setShowEventModal: (show: boolean) => {},
  dispatchCalEvent: ({type, payload}) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: (event: CalendarEvent) => {},
  labels: [],
  setLabels: (lbls: any) => {},
  updateLabel: (lbl: any) => {},
  filteredEvents: []
});

export default GlobalContext;