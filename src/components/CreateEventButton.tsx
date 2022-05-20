import React from 'react'
import plusImg from '../assets/plus.svg'
import { updateShowEventModalAtom } from '../atoms/ShowEventModalAtom'

const CreateEventButton: React.FC = () => {

  console.log("Create event button rendered");
  return (
    <button 
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
      onClick={() => updateShowEventModalAtom(true)}>
      <img src={plusImg} alt="create event" className="w-7 h-7"/>
      <span className="pl-3 pr-7"> Create</span>
    </button>
  ) 
}

export default CreateEventButton;