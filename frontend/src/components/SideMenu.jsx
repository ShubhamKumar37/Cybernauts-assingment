import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addFlow, selectFlow, setFlows, deleteFlow, updateFlow } from '../redux/slices/flowSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SideMenu = () => {
    const dispatch = useDispatch();
    const flows = useSelector(state => state.flows.flowList);
    const activeFlow = useSelector(state => state.flows.selectedFlow);

    const [newFlowName, setNewFlowName] = useState("");
    const [editFlowName, setEditFlowName] = useState(""); // For storing the flow name while editing
    const [editingFlowId, setEditingFlowId] = useState(null); // To track which flow is being edited

    // Fetch flows when component mounts
    useEffect(() => {
        const fetchFlows = async () => {
            try {
                toast.info("Loading flows...");
                const response = await axios.get('/api/users/', { withCredentials: true });
                dispatch(setFlows(response.data.data)); // Dispatch the fetched flows to Redux
                toast.success("Flows loaded successfully!");
            } catch (error) {
                console.error("Error fetching flows:", error);
                toast.error("Error loading flows.");
            }
        };

        fetchFlows();
    }, [dispatch]);

    // Function to handle creating a new flow
    const createNewFlow = async () => {
        if (newFlowName.trim()) {
            try {
                toast.info("Creating new flow...");
                const flowData = {
                    userName: newFlowName, // Flow name
                    nodes: [], // Start with an empty array for nodes
                    edges: [], // Start with an empty array for edges
                };

                const response = await axios.post('/api/users/', flowData);

                if (response.data.success) {
                    const newFlow = response.data.data;
                    dispatch(addFlow(newFlow)); // Add the new flow to Redux state
                    dispatch(selectFlow(newFlow._id)); // Set it as the active flow using _id
                    setNewFlowName(""); // Reset the input field
                    toast.success("Flow created successfully!");
                } else {
                    toast.error("Error creating flow.");
                }
            } catch (error) {
                console.error("Error creating flow:", error);
                toast.error("Error creating flow.");
            }
        } else {
            toast.warning("Please enter a flow name.");
        }
    };

    // Function to handle flow selection
    const handleFlowSelect = (flowId) => {
        dispatch(selectFlow(flowId)); // Dispatch the selectFlow action using _id
        toast.info("Flow selected.");
    };

    // Function to handle editing a flow's name
    const handleEditFlow = (flow, e) => {
        e.stopPropagation();
        setEditingFlowId(flow._id); // Set the flow's _id to editing mode
        setEditFlowName(flow.userName); // Set the flow's current name to the edit state
    };

    // Function to save the edited flow name
    const saveEditedFlow = async (flowId) => {
        if (editFlowName.trim()) {
            try {
                toast.info("Saving flow name...");
                const response = await axios.put(`/api/users/names/${flowId}`, { userName: editFlowName }, { withCredentials: true });

                if (response.data.success) {
                    dispatch(updateFlow(response.data.data));
                    setEditingFlowId(null);
                    setEditFlowName("");
                    toast.success("Flow name updated successfully!");
                } else {
                    toast.error("Error updating flow name.");
                }
            } catch (error) {
                console.error("Error updating flow:", error);
                toast.error("Error updating flow name.");
            }
        } else {
            toast.warning("Flow name cannot be empty.");
        }
    };

    // Function to handle deleting a flow
    const handleDeleteFlow = async (flowId, e) => {
        e.stopPropagation();
        try {
            toast.info("Deleting flow...");
            const response = await axios.delete(`/api/users/${flowId}`, { withCredentials: true });

            if (response.data.success) {
                dispatch(deleteFlow(flowId));

                if (activeFlow === flowId) {
                    dispatch(selectFlow(null));
                }
                toast.success("Flow deleted successfully!");
            } else {
                toast.error("Error deleting flow.");
            }
        } catch (error) {
            console.error("Error deleting flow:", error);
            toast.error("Error deleting flow.");
        }
    };

    return (
        <div className="w-[30%] bg-blue-400 p-4">
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
                        key={flow._id}
                        className={`flex items-center justify-between cursor-pointer mb-2 p-2 rounded hover:bg-blue-700 ${activeFlow === flow._id ? "bg-gray-500" : ""}`}
                        onClick={() => { if (!editingFlowId) handleFlowSelect(flow._id) }}
                    >
                        <span className="max-w-[60%]">
                            {editingFlowId === flow._id ? (
                                <input
                                    type="text"
                                    value={editFlowName}
                                    onChange={(e) => { e.stopPropagation(); setEditFlowName(e.target.value) }}
                                    className="p-1 w-full border border-gray-300 bg-black rounded"
                                />
                            ) : (
                                flow.userName
                            )}
                        </span>
                        <div className="flex space-x-2 max-w-[40%] text-sm">
                            {editingFlowId === flow._id ? (
                                <button
                                    onClick={() => saveEditedFlow(flow._id)}
                                    className="p-1 bg-green-500 text-white rounded"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => handleEditFlow(flow, e)}
                                    className="p-1 bg-yellow-500 text-white rounded"
                                >
                                    Edit
                                </button>
                            )}

                            <button
                                onClick={(e) => handleDeleteFlow(flow._id, e)}
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
