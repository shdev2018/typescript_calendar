import { addChangeHandler, Atom, deref, swap } from '@dbeining/react-atom';
import { CalendarEvent } from '../utils';
import { updateFilteredEvents } from './FilteredEventsAtom';
import { LabelStatus, LabelsAtom } from './LabelsAtom';

export const SavedEventsAtom = Atom.of(initEvents());

function initEvents(): CalendarEvent[] {
    const storageEvents = localStorage.getItem('savedEvents');
    return storageEvents ? JSON.parse(storageEvents) : [];
}

interface DispatchCalenderEvent {
    type: string;
    payload: CalendarEvent;
}

export function dispatchCalenderEventAtom({
    type,
    payload,
}: DispatchCalenderEvent) {
    swap(SavedEventsAtom, (prev: CalendarEvent[]) => {
        switch (type) {
            case 'push':
                let newValPush = [...prev, payload];
                update(newValPush);
                return newValPush;
            case 'update':
                let newValUpdate = prev.map((evt: CalendarEvent) =>
                    evt.id === payload.id ? payload : evt
                );
                update(newValUpdate);
                return newValUpdate;
            case 'delete':
                let newVal = prev.filter(
                    (evt: CalendarEvent) => evt.id !== payload.id
                );
                update(newVal);
                return newVal;
            default:
                throw new Error();
        }
    });
}

addChangeHandler(
    SavedEventsAtom,
    'savedEventsHook',
    ({ previous, current }) => {
        console.log(previous, current);
        updateLabels();
        updateFilteredEvents();
    }
);

export function updateLabels() {
    const savedEvents = deref(SavedEventsAtom);
    swap(LabelsAtom, (prevLabels) => {
        return [
            ...new Set(savedEvents.map((evt: CalendarEvent) => evt.label)),
        ].map((label) => {
            const currentLabel = prevLabels.find((lbl) => lbl.label === label);
            return {
                label,
                checked: currentLabel ? currentLabel.checked : true,
            } as LabelStatus;
        });
    });
}

function update(val: CalendarEvent[]) {
    localStorage.setItem('savedEvents', JSON.stringify(val));
}