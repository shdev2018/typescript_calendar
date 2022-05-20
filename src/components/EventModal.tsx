import React, { useState } from 'react';
import { CalendarEvent } from '../utils';
import { Guid } from 'guid-factory';
import { dispatchCalenderEventAtom } from '../atoms/SavedEventsAtom';
import {
    ShowEventModalAtom,
    updateShowEventModalAtom,
} from '../atoms/ShowEventModalAtom';
import { useAtom } from '@dbeining/react-atom';
import { SelectedEventAtom } from '../atoms/SelectedEventAtom';
import { DaySelectedAtom } from '../atoms/DaySelectedAtom';

const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

const EventModal: React.FC = () => {
    const showEventModal = useAtom(ShowEventModalAtom);

    const selectedEvent = useAtom(SelectedEventAtom);
    const daySelected = useAtom(DaySelectedAtom);

    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ''
    );

    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ''
    );
    //
    function updateTitleAtom(title: string) {
        setTitle(title);
    }
    function updateDescriptionAtom(description: string) {
        setDescription(description);
    }

    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[0]
    );
    function updateSelectedLabelAtom(description: string) {
        setSelectedLabel(description);
    }

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
            dispatchCalenderEventAtom({
                type: 'update',
                payload: calendarEvent,
            });
        else
            dispatchCalenderEventAtom({ type: 'push', payload: calendarEvent });

        updateShowEventModalAtom(false);
    };

    console.log('Event modal rendered');
    return (
        <>
            {showEventModal && (
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
                                            dispatchCalenderEventAtom({
                                                type: 'delete',
                                                payload: selectedEvent,
                                            });
                                            updateShowEventModalAtom(false);
                                        }}
                                    >
                                        delete
                                    </span>
                                )}
                                <button
                                    onClick={() =>
                                        updateShowEventModalAtom(false)
                                    }
                                >
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
                                    onChange={(e) =>
                                        updateTitleAtom(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        updateDescriptionAtom(e.target.value)
                                    }
                                    value={description}
                                />
                                <span className="material-icons-outlined text-gray-400">
                                    bookmark_border
                                </span>
                                <div className="flex gap-x-2">
                                    {labelsClasses.map((lblClass, i) => (
                                        <span
                                            key={Guid.newGuid()}
                                            onClick={() =>
                                                updateSelectedLabelAtom(
                                                    lblClass
                                                )
                                            }
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
            )}
        </>
    );
};

export default EventModal;
