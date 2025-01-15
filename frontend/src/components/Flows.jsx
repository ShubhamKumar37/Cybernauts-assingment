import React, { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TextUpdaterNode from './TextUpdaterNode';

const Flows = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    // Function to add a new node
    const addNode = () => {
        const newNodeId = (nodes.length + 1).toString();
        const newNode = {
            id: newNodeId,
            position: { x: Math.random() * 200, y: Math.random() * 200 },
            data: {
                label: `Node ${newNodeId}`,
                deleteNode: handleDeleteNode,
                onLabelChange: handleLabelChange,
            },
            type: 'textUpdater',
        };

        // Update nodes state
        setNodes((prevNodes) => [...prevNodes, newNode]);

        // Log the updated nodes state
        console.log("Nodes after addNode: ", [...nodes, newNode]);
    };

    // Function to delete a node
    const handleDeleteNode = (nodeId) => {
        setNodes((nds) => nds.filter((node) => node.id !== nodeId));
        setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));

        // Log the updated nodes and edges state after deletion
        console.log("Nodes after handleDeleteNode: ", nodes.filter((node) => node.id !== nodeId));
        console.log("Edges after handleDeleteNode: ", edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    };

    // Function to handle label change
    const handleLabelChange = (nodeId, newLabel) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === nodeId ? { ...node, data: { ...node.data, label: newLabel } } : node
            )
        );

        // Log the updated nodes state after label change
        console.log("Nodes after handleLabelChange: ", nodes);
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

    // Register custom node type
    const nodeTypes = {
        textUpdater: TextUpdaterNode,
    };

    console.log("this is nodes = ", nodes);
    console.log("this is edges = ", edges);

    return (
        <div className=" h-[100vh]">
            <button
                onClick={addNode}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded absolute z-[1]"
            >
                Add Node
            </button>
            <ReactFlow
                nodes={nodes}
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
