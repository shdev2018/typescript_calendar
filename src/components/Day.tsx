import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { CalendarEvent } from '../utils';
import { Guid } from 'guid-factory';
import { Atom, swap, useAtom } from '@dbeining/react-atom';
import { FilteredEventsAtom } from '../atoms/FilteredEventsAtom';
import { updateShowEventModalAtom } from '../atoms/ShowEventModalAtom';
import { updateSelectedEventAtom } from '../atoms/SelectedEventAtom';
import { updateDaySelectedAtom } from '../atoms/DaySelectedAtom';
//import { SavedEventsAtom } from '../atoms/SavedEventsAtom';

interface DayProps {
    day: dayjs.Dayjs;
    rowIdx: number;
}

const Day: React.FC<DayProps> = ({ day, rowIdx }) => {
    //const savedEvents = useAtom(SavedEventsAtom);
    const filteredEvents = useAtom(FilteredEventsAtom);

    const DayEventsAtom = Atom.of<CalendarEvent[]>([]);
    function updateDayEventsAtom(events: CalendarEvent[]) {
        swap(DayEventsAtom, (prev) =>
            prev = events
        );
    }
    const dayEvents = useAtom(DayEventsAtom);

    useEffect(() => {
        const events = filteredEvents.filter(
            (evt: CalendarEvent) =>
                dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
        );
        updateDayEventsAtom(events);
    }, [filteredEvents, day]);

    function getCurrentDayClass() {
        return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
            ? 'bg-blue-600 text-white rounded-full w-7'
            : '';
    }

    console.log(`Day rendered ${day}`);
    return (
        <div className="border border-gray-200 flex flex-col">
            <header className="flex flex-col items-center">
                {rowIdx === 0 && (
                    <p className="text-sm mt-1">
                        {day.format('ddd').toUpperCase()}
                    </p>
                )}
                <p
                    className={`text-sm p-1 my-1 text-centre ${getCurrentDayClass()}`}
                >
                    {day.format('DD')}
                </p>
            </header>
            <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                    updateDaySelectedAtom(day);
                    updateShowEventModalAtom(true);
                }}
            >
                {dayEvents.map((evt: CalendarEvent, idx: number) => (
                    <div
                        key={Guid.newGuid()}
                        onClick={() => updateSelectedEventAtom(evt)}
                        className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-small rounded mb-1 truncate`}
                    >
                        {evt.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Day;