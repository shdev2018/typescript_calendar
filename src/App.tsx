import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import { getMonth } from './utils';
import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import EventModal from './components/EventModal';
import { Dayjs } from 'dayjs';
import { useAtom } from '@dbeining/react-atom';
import { MonthIndexAtom } from './atoms/MonthIndexAtom';
import { updateLabels } from './atoms/SavedEventsAtom';
import { updateFilteredEvents } from './atoms/FilteredEventsAtom';

const App: React.FC = () => {
    const monthIndex = useAtom(MonthIndexAtom);

    useEffect(() => {
        console.log('initial filling');
        updateLabels();
        updateFilteredEvents();
    }, []);

    console.log('App rendered');
    return (
        <>
            <EventModal />
            <div className="h-screen flex flex-col">
                <CalendarHeader />
                <div className="flex flex-1">
                    <Sidebar />
                    <Month month={getMonth(monthIndex)} />
                </div>
            </div>
        </>
    );
};

export default App;
