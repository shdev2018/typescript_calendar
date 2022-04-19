import dayjs from 'dayjs'
import React, { useState, useEffect, useReducer, useMemo } from 'react';
import GlobalContext from './GlobalContext';

function savedEventsReducer(state: any, {type, payload}: any) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return (state).map((evt: any) => evt.id === payload.id ? payload : evt);
    case "delete":
      return (state).filter((evt: any) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem('savedEvents');
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

const ContextWrapper: React.FC = ({children}): any => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth]: any = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal]: any = useState(false);
  const [selectedEvent, setSelectedEvent]: any = useState(null);
  const [labels, setLabels] = useState<Array<any>>([]);
  const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);
  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt: any) => 
      labels.filter(lbl => lbl.checked)
            .map(lbl => lbl.label)
            .includes(evt.label)
    );
  }, [savedEvents, labels])

  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents])


  useEffect(() => {
    setLabels((prevLabels): any => {
      return [...new Set( savedEvents.map((evt: any) => evt.label) )].map(label => {
        const currentLabel: any = prevLabels.find((lbl: any) => lbl.label === label)
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true
        }
      })
    })
  }, [savedEvents])

  useEffect(() => {
    if(smallCalendarMonth !== null)
      setMonthIndex(smallCalendarMonth)
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal)
      setSelectedEvent(null);
  }, [showEventModal])

  function updateLabel(label: any) {
    setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl))
  }

  return (
    <GlobalContext.Provider value={{
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
      filteredEvents
    }}>
      {children}
    </GlobalContext.Provider>
  ) 
}

export default ContextWrapper;
