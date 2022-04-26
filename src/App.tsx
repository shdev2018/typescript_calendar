import React, { useState, useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getMonth } from './utils'
import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import GlobalContext from './context/GlobalContext'
import EventModal from './components/EventModal'
import {Dayjs} from "dayjs";

const App: React.FC = () => {
  const{ 
    monthIndex,
    showEventModal
  } = useContext(GlobalContext);

  const[currentMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
  
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex] )
  
  return (
    <>
      {showEventModal && <EventModal/>}
      <div className="h-screen flex flex-col">
        <CalendarHeader/>
        <div className="flex flex-1">
          <Sidebar/>
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
}

export default App;
