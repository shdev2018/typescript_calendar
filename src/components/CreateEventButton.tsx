import React, { useContext } from 'react'
import plusImg from '../assets/plus.svg'
import GlobalContext from '../context/GlobalContext'

const CreateEventButton: React.FC = () => {
  const { setShowEventModal } = useContext(GlobalContext)

  return (
    <button 
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
      onClick={() => setShowEventModal(true)}>
      <img src={plusImg} alt="create event" className="w-7 h-7"/>
      <span className="pl-3 pr-7"> Create</span>
    </button>
  ) 
}

export default CreateEventButton;