import React from 'react';
import logo from '../assets/logo.png';
import dayjs from 'dayjs';
import { useAtom } from '@dbeining/react-atom';
import { MonthIndexAtom, updateMonthIndexAtom } from '../atoms/MonthIndexAtom';

const CalendarHeader: React.FC = () => {
  const monthIndex = useAtom(MonthIndexAtom);

  function handlePrevMonth() {
    updateMonthIndexAtom(monthIndex - 1)
  }

  function handleNextMonth() {
    updateMonthIndexAtom(monthIndex + 1)
  }

  function handleReset() {
    updateMonthIndexAtom(monthIndex === dayjs().month() 
      ? monthIndex + Math.random() 
      : dayjs().month()
    );
  }
  console.log("Calendar header rendered");
  return (
    <header className="px-4 py-2 flex items-center">
      <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl text-gray-500 font-bold">Calendar</h1>
      <button className="border rounded py-2 px-4 mr-5" onClick={handleReset}>Today</button>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">chevron_left</span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">chevron_right</span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  )
}

export default CalendarHeader;