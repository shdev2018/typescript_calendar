import dayjs from 'dayjs'
import React from 'react'
import Day from './Day'

interface Props {
  month: dayjs.Dayjs[][]
}

const Month: React.FC<Props> = ({month}: Props)=> {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Month;