import dayjs from 'dayjs';
import React from 'react';
import Day from './Day';
import { Guid } from 'guid-factory';

interface MonthProps {
    month: dayjs.Dayjs[][];
}

const Month: React.FC<MonthProps> = ({ month }: MonthProps) => {

    console.log("Month rendered");
    return (
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
            {month.map((row, i) => (
                <React.Fragment key={Guid.newGuid()}>
                    {row.map((day, idx) => (
                        <Day day={day} key={Guid.newGuid()} rowIdx={i} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Month;
