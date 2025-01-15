import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addFlow, updateFlow, deleteFlow, selectFlow } from '../redux/slices/flowSlice';

const SideMenu = () => {
    const dispatch = useDispatch();
    const flows = useSelector(state => state.flows.flowList);
    const activeFlow = useSelector(state => state.flows.selectedFlow);

    const [newFlowName, setNewFlowName] = useState("");
    const [editFlowName, setEditFlowName] = useState(""); // For storing the flow name while editing
    const [isEditing, setIsEditing] = useState(false); // For toggle edit mode

    // Function to handle creating a new flow
    const createNewFlow = () => {
        if (newFlowName.trim()) {
            const newFlow = { id: Date.now(), name: newFlowName }; // Create a new flow with a unique id
            dispatch(addFlow(newFlow)); // Dispatch the addFlow action
            dispatch(selectFlow(newFlow.id)); // Set the newly created flow as active
            setNewFlowName("");
        }
    };

    // Function to handle flow selection
    const handleFlowSelect = (flowId) => {
        dispatch(selectFlow(flowId)); // Dispatch the selectFlow action
    };

    // Function to handle editing a flow's name
    const handleEditFlow = (flow) => {
        setIsEditing(true);
        setEditFlowName(flow.name);
    };

    // Function to save the edited flow name
    const saveEditedFlow = (flowId) => {
        if (editFlowName.trim()) {
            const updatedFlow = { id: flowId, name: editFlowName };
            dispatch(updateFlow(updatedFlow)); // Dispatch the updateFlow action
            setIsEditing(false);
        }
    };

    // Function to handle deleting a flow
    const handleDeleteFlow = (flowId) => {
        dispatch(deleteFlow(flowId)); // Dispatch the deleteFlow action
        if (activeFlow === flowId) {
            dispatch(selectFlow(null)); // Reset active flow if deleted
        }
    };

    return (
        <div className="w-[30%] bg-green-500 p-4">
            <h2 className="text-white mb-4">Create New Flow</h2>
            <input
                type="text"
                placeholder="Enter flow name"
                value={newFlowName}
                onChange={(e) => setNewFlowName(e.target.value)}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
            />
            <button
                onClick={createNewFlow}
                className="w-full p-2 bg-blue-500 text-white rounded"
            >
                Create Flow
            </button>

            {/* List of created flows */}
            <h2 className="text-white mt-6 mb-4 w-fit">Existing Flows</h2>
            <ul className="text-white">
                {flows.map((flow) => (
                    <li
                        key={flow.id}
                        className={`flex items-center justify-between cursor-pointer mb-2 p-2 rounded hover:bg-gray-700 ${activeFlow === flow.id ? "bg-gray-500" : ""}`}
                        onClick={() => handleFlowSelect(flow.id)}
                    >
                        <span className="max-w-[60%]">
                            {isEditing && activeFlow === flow.id ? (
                                <input
                                    type="text"
                                    value={editFlowName}
                                    onChange={(e) => setEditFlowName(e.target.value)}
                                    className="p-1 w-full border border-gray-300 bg-black rounded"
                                />
                            ) : (
                                flow.name
                            )}
                        </span>
                        <div className="flex space-x-2 max-w-[40%] text-sm">
                            {isEditing && activeFlow === flow.id ? (
                                <button
                                    onClick={() => saveEditedFlow(flow.id)}
                                    className="p-1 bg-green-500 text-white rounded"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEditFlow(flow)}
                                    className="p-1 bg-yellow-500 text-white rounded"
                                >
                                    Edit
                                </button>
                            )}

                            <button
                                onClick={() => handleDeleteFlow(flow.id)}
                                className="p-1 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideMenu;
