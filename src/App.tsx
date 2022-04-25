import React, { useState, useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getMonth } from './utils'
import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import GlobalContext from './context/GlobalContext'
import EventModal from './components/EventModal'

const App: React.FC = () => {
  const{ 
    monthIndex,
    showEventModal
  } = useContext(GlobalContext);

  const[currentMonth, setCurrentMonth] = useState(getMonth()); 
  
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex] )
  
  return (
    <React.Fragment>
      {/* Register colors for some reason??? */}
      <div hidden className="
        bg-indigo-200 bg-red-200 bg-purple-200 bg-green-200 bg-gray-200 bg-blue-200
        text-indigo-400 text-red-400 text-purple-400 text-green-400 text-gray-400 text-blue-400
        bg-indigo-500 bg-red-500 bg-purple-500 bg-green-500 bg-gray-500 bg-blue-500"></div>
      {showEventModal && <EventModal/>}
      <div className="h-screen flex flex-col">
        <CalendarHeader/>
        <div className="flex flex-1">
          <Sidebar/>
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;