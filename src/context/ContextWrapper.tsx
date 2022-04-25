import dayjs from 'dayjs';
import React, { useState, useEffect, useReducer, useMemo } from 'react';
import GlobalContext, {
    DispatchCalenderEvent,
    LabelStatus,
} from './GlobalContext';
import { CalendarEvent } from '../utils';

function savedEventsReducer(
    state: CalendarEvent[],
    { type, payload }: DispatchCalenderEvent
) {
    switch (type) {
        case 'push':
            return [...state, payload];
        case 'update':
            return state.map((evt: CalendarEvent) =>
                evt.id === payload.id ? payload : evt
            );
        case 'delete':
            return state.filter((evt: CalendarEvent) => evt.id !== payload.id);
        default:
            throw new Error();
    }
}

function initEvents() {
    const storageEvents = localStorage.getItem('savedEvents');
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
}

const ContextWrapper: React.FC = ({ children }) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState<number | null>(
        null
    );
    const [daySelected, setDaySelected] = useState<dayjs.Dayjs | null>(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
        null
    );
    const [labels, setLabels] = useState<LabelStatus[]>([]);
    const [savedEvents, dispatchCalEvent] = useReducer(
        savedEventsReducer,
        [],
        initEvents
    );
    const filteredEvents = useMemo(() => {
        return savedEvents.filter(
            (evt: CalendarEvent) => {
                return evt.label === undefined 
                || labels
                    .filter((lbl) => lbl.checked)
                    .map((lbl) => lbl.label)
                    .includes(evt.label);
            }
        );
    }, [savedEvents, labels]);

    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    }, [savedEvents]);

    useEffect(() => {
        setLabels((prevLabels) => {
            return [
                ...new Set(savedEvents.map((evt: CalendarEvent) => evt.label)),
            ].map((label) => {
                const currentLabel = prevLabels.find(
                    (lbl) => lbl.label === label
                );
                return {
                    label,
                    checked: currentLabel ? currentLabel.checked : true,
                } as LabelStatus;
            });
        });
    }, [savedEvents]);

    useEffect(() => {
        if (smallCalendarMonth !== null) setMonthIndex(smallCalendarMonth);
    }, [smallCalendarMonth]);

    useEffect(() => {
        if (!showEventModal) setSelectedEvent(null);
    }, [showEventModal]);

    function updateLabel(label: LabelStatus) {
        setLabels(
            labels.map((lbl) => (lbl.label === label.label ? label : lbl))
        );
    }

    return (
        <GlobalContext.Provider
            value={{
                monthIndex,
                setMonthIndex,
                smallCalendarMonth,
                setSmallCalendarMonth,
                daySelected,
                setDaySelected,
                showEventModal,
                setShowEventModal,
                dispatchCalEvent,
                selectedEvent,
                setSelectedEvent,
                savedEvents,
                labels,
                setLabels,
                updateLabel,
                filteredEvents,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default ContextWrapper;
