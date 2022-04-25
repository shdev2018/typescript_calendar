import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import { CalendarEvent } from '../utils';

const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

const EventModal: React.FC = () => {
    const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
        useContext(GlobalContext);
    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ''
    );
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ''
    );
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[0]
    );
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const calendarEvent: CalendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected?.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        if (selectedEvent)
            dispatchCalEvent({ type: 'update', payload: calendarEvent });
        else dispatchCalEvent({ type: 'push', payload: calendarEvent });

        setShowEventModal(false);
    };

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
                <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                    <span className="material-icons-outlined text-gray-400">
                        drag_handle
                    </span>
                    <div>
                        {selectedEvent && (
                            <span
                                className="material-icons-outlined text-gray-400 cursor-pointer"
                                onClick={() => {
                                    dispatchCalEvent({
                                        type: 'delete',
                                        payload: selectedEvent,
                                    });
                                    setShowEventModal(false);
                                }}
                            >
                                delete
                            </span>
                        )}
                        <button onClick={() => setShowEventModal(false)}>
                            <span className="material-icons-outlined text-gray-400">
                                close
                            </span>
                        </button>
                    </div>
                </header>
                <div className="p-3">
                    <div className="grid grid-cols-1/5 items-end gap-y-7">
                        <div></div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Add title"
                            required
                            autoFocus
                            className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full 
                border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <span className="material-icons-outlined text-gray-400">
                            schedule
                        </span>
                        <p>{daySelected?.format('dddd, MMMM DD')}</p>
                        <span className="material-icons-outlined text-gray-400">
                            segment
                        </span>
                        <input
                            type="text"
                            name="description"
                            placeholder="Add a description"
                            required
                            className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 
                focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <span className="material-icons-outlined text-gray-400">
                            bookmark_border
                        </span>
                        <div className="flex gap-x-2">
                            {labelsClasses.map((lblClass, i) => (
                                <span
                                    key= {`eventmodal-labels-${lblClass}-${i}`}
                                    onClick={() => setSelectedLabel(lblClass)}
                                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex 
                    items-center justify-center cursor-pointer`}
                                >
                                    {selectedLabel === lblClass && (
                                        <span className="material-icons-outlined text-white text-sm">
                                            check
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className="flex justify-end border-t p-3 mt-5">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                        type="submit"
                    >
                        Save
                    </button>
                </footer>
            </form>
        </div>
    );
};

export default EventModal;
