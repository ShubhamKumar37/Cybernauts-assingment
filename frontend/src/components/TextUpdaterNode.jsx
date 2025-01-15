import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { MdDelete } from "react-icons/md";

function TextUpdaterNode({ data, id }) {
    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(data.label || '');

    const handleLabelChange = (e) => {
        setLabel(e.target.value);
        if (data.onLabelChange) {
            data.onLabelChange(id, e.target.value);
        }
    };

    return (
        <div className="text-updater-node p-4 bg-gray-100 rounded-lg shadow-md relative">
            <Handle type="target" position={Position.Top} />
            <div>
                {isEditing ? (
                    <input
                        type="text"
                        value={label}
                        onChange={handleLabelChange}
                        onBlur={() => setIsEditing(false)}
                        className="nodrag mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                ) : (
                    <p onClick={() => setIsEditing(true)} className="cursor-pointer">
                        {label || 'Click to edit'}
                    </p>
                )}
            </div>
            <button
                onClick={() => data.deleteNode(id)}
                className="absolute top-0 right-0 px-[6px] py-[1px] bg-red-500 text-white rounded-full text-[8px]"
            >
                <MdDelete/>
            </button>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export default TextUpdaterNode;
