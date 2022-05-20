import { Atom, swap } from '@dbeining/react-atom';
import { CalendarEvent } from '../utils';

export const SelectedEventAtom = Atom.of<CalendarEvent | null>(null);
export function updateSelectedEventAtom(event: CalendarEvent | null) {
    swap(SelectedEventAtom, (prev) =>
        prev = event
    );
}