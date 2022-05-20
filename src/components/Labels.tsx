import React from 'react';
import { Guid } from 'guid-factory';
import { useAtom } from '@dbeining/react-atom';
import { LabelsAtom, updateLabel } from '../atoms/LabelsAtom';

const Labels: React.FC = () => {
    //const { labels, updateLabel } = useContext(GlobalContext);
    const labels = useAtom(LabelsAtom);

    console.log("Labels rendered");
    return (
        <React.Fragment>
            <p className="text-gray-500 font-bold mt-10">Label</p>
            {labels.map(({ label: lbl, checked }, idx) => (
                <span
                    key={Guid.newGuid()}
                    className="items-center mt-3 block"
                >
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                            updateLabel({ label: lbl, checked: !checked })
                        }
                        className={`form-checkbox h-5 w-5 bg-${lbl.toLowerCase()}-200 text-${lbl.toLowerCase()}-400 rounded focus:ring-0 cursor-pointer`}
                    />
                    <span className="ml-2 text-gray-700 capitalize">{lbl}</span>
                </span>
            ))}
        </React.Fragment>
    );
};

export default Labels;
