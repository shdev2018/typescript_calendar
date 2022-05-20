import { Atom, deref, swap } from '@dbeining/react-atom';
import { SavedEventsAtom } from './SavedEventsAtom';
import { LabelsAtom } from './LabelsAtom';
import { CalendarEvent } from '../utils';

export const FilteredEventsAtom = Atom.of<CalendarEvent[]>([]);

export function updateFilteredEvents() {
    const savedEvents = deref(SavedEventsAtom);
    const labels = deref(LabelsAtom);
    //console.log('inside', savedEvents, labels);
    swap(FilteredEventsAtom, () => {
        return savedEvents.filter((evt: CalendarEvent) => {
            return (
                evt.label === undefined ||
                labels
                    .filter((lbl) => lbl.checked)
                    .map((lbl) => lbl.label)
                    .includes(evt.label)
            );
        });
    });
}
