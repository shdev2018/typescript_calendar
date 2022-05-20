import { Atom, swap } from '@dbeining/react-atom';
import dayjs from 'dayjs';

export const MonthIndexAtom = Atom.of<number>(dayjs().month());
export function updateMonthIndexAtom(idx: number) {
    swap(MonthIndexAtom, (prev) =>
        prev = idx
    );
}