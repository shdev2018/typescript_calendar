import dayjs from 'dayjs';
import React from 'react';
import { CalendarEvent } from '../utils';

export interface DispatchCalenderEvent {
    type: string;
    payload: CalendarEvent;
}
export interface LabelStatus {
    label: string;
    checked: boolean;
}

interface GlobalContext {
    monthIndex: number;
    setMonthIndex: (index: number) => void;
    smallCalendarMonth: number | null;
    setSmallCalendarMonth: React.Dispatch<React.SetStateAction<number | null>>;
    daySelected: dayjs.Dayjs | null;
    setDaySelected: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
    showEventModal: boolean;
    setShowEventModal: React.Dispatch<React.SetStateAction<boolean>>;
    dispatchCalEvent: (obj: DispatchCalenderEvent) => void;
    savedEvents: Array<CalendarEvent>;
    selectedEvent: CalendarEvent | null;
    setSelectedEvent: React.Dispatch<
        React.SetStateAction<CalendarEvent | null>
    >;
    labels: LabelStatus[];
    setLabels: React.Dispatch<React.SetStateAction<LabelStatus[]>>;
    updateLabel: (obj: LabelStatus) => void;
    filteredEvents: CalendarEvent[];
}

const GlobalContext = React.createContext<GlobalContext>({
    monthIndex: 0,
    setMonthIndex: (index: number) => {},
    smallCalendarMonth: 0,
    setSmallCalendarMonth: () => {},
    daySelected: null,
    setDaySelected: () => {},
    showEventModal: false,
    setShowEventModal: () => {},
    dispatchCalEvent: ({ type, payload }) => {},
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: () => {},
    labels: [],
    setLabels: () => {},
    updateLabel: (obj: LabelStatus) => {},
    filteredEvents: [],
});

export default GlobalContext;
