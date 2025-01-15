import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addFlow, selectFlow, setFlows, deleteFlow, updateFlow } from '../redux/slices/flowSlice';  // Added setFlows action
import axios from 'axios';

const SideMenu = () => {
    const dispatch = useDispatch();
    const flows = useSelector(state => state.flows.flowList);
    const activeFlow = useSelector(state => state.flows.selectedFlow);

    const [newFlowName, setNewFlowName] = useState("");
    const [editFlowName, setEditFlowName] = useState(""); // For storing the flow name while editing
    const [isEditing, setIsEditing] = useState(false); // For toggle edit mode

    // Fetch flows when component mounts
    useEffect(() => {
        const fetchFlows = async () => {
            try {
                const response = await axios.get('/api/users/', { withCredentials: true });
                console.log("Fetched flows:", response.data.data);
                dispatch(setFlows(response.data.data)); // Dispatch the fetched flows to Redux
            } catch (error) {
                console.error("Error fetching flows:", error);
            }
        };

        fetchFlows();
    }, [dispatch]);

    // Function to handle creating a new flow
    const createNewFlow = async () => {
        console.log("This is the new flow name  = ", newFlowName)
        if (newFlowName.trim()) {
            try {
                const flowData = {
                    userName: newFlowName, // Flow name
                    nodes: [], // Start with an empty array for nodes
                    edges: [], // Start with an empty array for edges
                };

                const response = await axios.post('/api/users/', flowData);

                if (response.data.success) {
                    const newFlow = response.data.data;
                    dispatch(addFlow(newFlow)); // Add the new flow to Redux state
                    dispatch(selectFlow(newFlow.id)); // Set it as the active flow
                    setNewFlowName(""); // Reset the input field
                }
            } catch (error) {
                console.error("Error creating flow:", error);
            }
        }
    };

    // Function to handle flow selection
    const handleFlowSelect = (flowId) => {
        dispatch(selectFlow(flowId)); // Dispatch the selectFlow action
    };

    // Function to handle editing a flow's name
    const handleEditFlow = (flow) => {
        setIsEditing(true);
        setEditFlowName(flow.userName); // Set the flow's current name to the edit state
    };

    // Function to save the edited flow name
    const saveEditedFlow = (flowId) => {
        if (editFlowName.trim()) {
            const updatedFlow = { _id: flowId, userName: editFlowName };
            dispatch(updateFlow(updatedFlow)); // Dispatch the updateFlow action
            setIsEditing(false);
        }
    };

    // Function to handle deleting a flow
    const handleDeleteFlow = async (flowId, flowDbId) => {
        try {
            // Send DELETE request to backend to delete the flow
            const response = await axios.delete(`/api/users/${flowDbId}`, { withCredentials: true });

            if (response.data.success) {
                // Dispatch the deleteFlow action to remove the flow from Redux state
                dispatch(deleteFlow(flowId));

                // If the active flow is deleted, reset the active flow
                if (activeFlow === flowId) {
                    dispatch(selectFlow(null));
                }
            }
        } catch (error) {
            console.error("Error deleting flow:", error);
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
                        key={flow._id} // Use _id for MongoDB documents
                        className={`flex items-center justify-between cursor-pointer mb-2 p-2 rounded hover:bg-gray-700 ${activeFlow === flow.id ? "bg-gray-500" : ""}`}
                        onClick={() => handleFlowSelect(flow.id)}
                    >
                        <span className="max-w-[60%]">
                            {isEditing && activeFlow === flow.id ? (
                                <input
                                    type="text"
                                    value={editFlowName}
                                    onChange={(e) => setEditFlowName(e.target.value)} // This binds the input to `editFlowName`
                                    className="p-1 w-full border border-gray-300 bg-black rounded"
                                />
                            ) : (
                                flow.userName // Display flow name (userName from backend)
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
                                onClick={() => handleDeleteFlow(flow.id, flow._id)} // Use `_id` for deletion
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
