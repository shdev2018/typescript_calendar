import { Atom, swap } from '@dbeining/react-atom';
import { SelectedEventAtom } from './SelectedEventAtom';

export const ShowEventModalAtom = Atom.of<boolean>(false);
export function updateShowEventModalAtom(show: boolean) {
    if (!show) {
        swap(SelectedEventAtom, (prev) =>
            prev = null
        );
    }
    swap(ShowEventModalAtom, (prev) =>
        prev = show
    );
}