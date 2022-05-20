import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { getMonth } from '../utils';
import { Guid } from 'guid-factory';
import { Atom, swap, useAtom } from '@dbeining/react-atom';
import { MonthIndexAtom } from '../atoms/MonthIndexAtom';
import { updateSmallCalendarMonthAtom } from '../atoms/SmallCalendarMonthAtom';
import {
    DaySelectedAtom,
    updateDaySelectedAtom,
} from '../atoms/DaySelectedAtom';

const SmallCalendar: React.FC = () => {
    const daySelected = useAtom(DaySelectedAtom);

    const monthIndex = useAtom(MonthIndexAtom);

    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());

    function updateCurrentMonthIdxAtom(idx: number) {
        setCurrentMonthIdx(idx);
    }

    const [currentMonth, setCurrentMonth] = useState(getMonth());

    function updateCurrentMonthAtom(month: dayjs.Dayjs[][]) {
        setCurrentMonth(month);
    }

    useEffect(() => {
        updateCurrentMonthIdxAtom(monthIndex);
    }, [monthIndex]);

    useEffect(() => {
        updateCurrentMonthAtom(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);

    function handlePrevMonth(): void {
        updateCurrentMonthIdxAtom(currentMonthIdx - 1);
    }

    function handleNextMonth(): void {
        updateCurrentMonthIdxAtom(currentMonthIdx + 1);
    }
    function getDayClass(day: dayjs.Dayjs): string {
        const format = 'DD-MM-YY';
        const nowDay = dayjs().format(format);
        const currentDay = day.format(format);
        const selectedDay = daySelected && daySelected.format(format);
        if (nowDay === currentDay) return 'bg-blue-500 rounded-full text-white';
        else if (currentDay === selectedDay)
            return 'bg-blue-100 rounded-full text-blue-600 font-bold';
        else return '';
    }

    //console.log('Small calendar rendered');
    return (
        <div className="mt-9">
            <header className="flex justify-between">
                <p className="text-gray-500 font-bold">
                    {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
                        'MMMM YYYY'
                    )}
                </p>
                <div>
                    <button onClick={handlePrevMonth}>
                        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                            chevron_left
                        </span>
                    </button>
                    <button onClick={handleNextMonth}>
                        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                            chevron_right
                        </span>
                    </button>
                </div>
            </header>
            <div className="grid grid-cols-7 grid-rows-6">
                {currentMonth[0] &&
                    currentMonth[0].map((day, i) => (
                        <span
                            key={day.toString() + i}
                            className="text-small py-1 text-center"
                        >
                            {day.format('dd').charAt(0)}
                        </span>
                    ))}
                {currentMonth.map((row, i) => (
                    <React.Fragment key={Guid.newGuid()}>
                        {row.map((day, i) => (
                            <button
                                key={Guid.newGuid()}
                                className={`py-1 w-full ${getDayClass(day)}`}
                                onClick={() => {
                                    updateSmallCalendarMonthAtom(
                                        currentMonthIdx
                                    );
                                    updateDaySelectedAtom(day);
                                }}
                            >
                                <span className="text-sm">
                                    {day.format('D')}
                                </span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default SmallCalendar;
