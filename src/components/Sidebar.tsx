import React from 'react'
import CreateEventButton from './CreateEventButton'
import SmallCalendar from './SmallCalendar'
import Labels from './Labels'


export default function Sidebar() {  
  console.log("Sidebar rendered");
  return (
    <aside className="border p-5 w-64">
      <CreateEventButton/>
      <SmallCalendar/>
      <Labels/>
    </aside>
  )
}
