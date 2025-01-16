import React, { useState, useEffect, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TextUpdaterNode from './TextUpdaterNode';
import axios from 'axios';
import { selectFlow } from '../redux/slices/flowSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Flows = ({ activeFlow, setActiveFlow }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [userName, setUserName] = useState("");
    const dispatch = useDispatch();

    // Memoize the handlers to ensure consistent function references
    const handleDeleteNode = useCallback((nodeId) => {
        setNodes((nds) => nds.filter((node) => node.id !== nodeId));
        setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    }, []);

    const handleLabelChange = useCallback((nodeId, newLabel) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === nodeId ? { ...node, data: { ...node.data, label: newLabel } } : node
            )
        );
    }, []);

    // Fetch nodes and edges when a flow is selected
    useEffect(() => {
        const fetchFlowData = async () => {
            try {
                toast.info("Loading flow data...");
                const response = await axios.get(`/api/users/${activeFlow}`, { withCredentials: true });
                if (response.data.success) {
                    const { nodes, edges } = response.data.data;
                    // Ensure that nodes and edges are updated properly
                    if (nodes) setNodes(JSON.parse(nodes)); // Update nodes
                    else setNodes([]); // If no nodes exist, reset to empty

                    if (edges) setEdges(JSON.parse(edges)); // Update edges
                    else setEdges([]); // If no edges exist, reset to empty

                    setUserName(response.data.data.userName);
                    toast.success("Flow data loaded successfully!");
                } else {
                    toast.error(`Error: ${response.data.message}`);
                }
            } catch (error) {
                console.error('Error fetching flow data:', error);
                toast.error("Error loading flow data.");
            }
        };

        if (activeFlow) {
            fetchFlowData();
        }
    }, [activeFlow]); // Make sure this triggers when activeFlow changes

    // Function to add a new node
    const addNode = () => {
        const newNodeId = (nodes.length + 1).toString();
        const newNode = {
            id: newNodeId,
            position: { x: Math.random() * 200, y: Math.random() * 200 },
            data: {
                label: `Node ${newNodeId}`,
            },
            type: 'textUpdater',
        };

        // Update nodes state
        setNodes((prevNodes) => [...prevNodes, newNode]);
        toast.info("New node added.");
    };

    // React Flow callback functions
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    // Save the flow data (nodes and edges) to the backend
    const printAllData = async () => {
        const flowData = {
            nodes: JSON.stringify(nodes),
            edges: JSON.stringify(edges),
        };

        try {
            toast.info("Saving flow data...");
            const response = await axios.put(`/api/users/${activeFlow}`, flowData);

            if (response.data.success) {
                toast.success("Flow saved successfully!");
            } else {
                toast.error(`Error saving flow: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error during save operation:', error);
            toast.error("Error saving flow data.");
        }
    };

    // Close the current flow by setting activeFlow to null
    const handleClose = () => {
        dispatch(selectFlow(null));  // Reset activeFlow to null
        toast.info("Flow closed.");
    };

    // Register custom node type
    const nodeTypes = {
        textUpdater: TextUpdaterNode,
    };

    return (
        <div className="h-[100vh]">
            <div className="relative p-1">
                <button
                    onClick={addNode}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded absolute z-[1]"
                >
                    Add Node
                </button>
                <button
                    onClick={printAllData}
                    className="mb-4 px-4 py-2 left-[10rem] bg-blue-500 text-white rounded absolute z-[1]"
                >
                    Save
                </button>
                <button
                    onClick={handleClose}
                    className="mb-4 px-4 py-2 left-[15rem] bg-red-500 text-white rounded absolute z-[1]"
                >
                    Close
                </button>
                <div
                    className="mb-4 px-4 py-2 left-[20rem] text-sm overflow-hidden max-w-[8rem] text-center bg-red-500 text-white rounded absolute z-[1]"
                >
                    {userName}
                </div>
            </div>
            <ReactFlow
                nodes={nodes.map((node) => ({
                    ...node,
                    data: {
                        ...node.data,
                        deleteNode: handleDeleteNode,
                        onLabelChange: handleLabelChange,
                    },
                }))}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default Flows;
