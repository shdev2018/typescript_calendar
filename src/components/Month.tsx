import dayjs from 'dayjs';
import React from 'react';
import Day from './Day';

interface MonthProps {
    month: dayjs.Dayjs[][];
}

const Month: React.FC<MonthProps> = ({ month }: MonthProps) => {
    return (
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
            {month.map((row, i) => (
                <React.Fragment key={`month-dayslist-{i}`}>
                    {row.map((day, idx) => (
                        <Day day={day} key={`month-dayslist-day-r-${i}`} rowIdx={i} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Month;
