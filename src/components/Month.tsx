import dayjs from 'dayjs';
import React from 'react';
import Day from './Day';
import { Guid } from 'guid-factory';

interface MonthProps {
    month: dayjs.Dayjs[][];
}

const Month: React.FC<MonthProps> = ({ month }: MonthProps) => {
    return (
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
            {month.map((row, i) => (
                <React.Fragment key={Guid.newGuid().toString()}>
                    {row.map((day, idx) => (
                        <Day day={day} key={Guid.newGuid().toString()} rowIdx={i} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Month;
