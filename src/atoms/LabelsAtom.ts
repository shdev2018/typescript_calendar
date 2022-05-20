import { addChangeHandler, Atom, swap } from '@dbeining/react-atom';
import { updateFilteredEvents } from './FilteredEventsAtom';

export interface LabelStatus {
    label: string;
    checked: boolean;
}

export const LabelsAtom = Atom.of<LabelStatus[]>([]);

export function updateLabel(label: LabelStatus) {
    swap(LabelsAtom, (prev) =>
        prev.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
}

addChangeHandler(LabelsAtom, 'labelsHook', () => {
    updateFilteredEvents();
});