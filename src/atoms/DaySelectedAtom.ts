import { Atom, swap } from '@dbeining/react-atom';
import dayjs from 'dayjs';

export const DaySelectedAtom = Atom.of<dayjs.Dayjs | null>(dayjs());
export function updateDaySelectedAtom(day: dayjs.Dayjs | null) {
    swap(DaySelectedAtom, () => day);
}
