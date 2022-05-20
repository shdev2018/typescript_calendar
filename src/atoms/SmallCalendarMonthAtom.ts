import { Atom, swap } from '@dbeining/react-atom';
import { MonthIndexAtom } from './MonthIndexAtom';

export const SmallCalendarMonthAtom = Atom.of<number | null>(0);
export function updateSmallCalendarMonthAtom(idx: number | null) {
    if (idx !== null) {
        swap(MonthIndexAtom, () => idx);
    }
    swap(SmallCalendarMonthAtom, () => idx);
}
